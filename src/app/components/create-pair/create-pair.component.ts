import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PairsService } from '../../services/pairs.service';
import { format, parseISO } from 'date-fns';
import { OtherService } from '../../services/other.service';
import { Institute, Subject } from '../../interfaces/interfaces';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-create-pair',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './create-pair.component.html',
  styleUrl: './create-pair.component.css'
})
export class CreatePairComponent implements OnInit {
  isEditMode: boolean = false;

  // Поля для данных
  pairName: string = '';
  lessonId: number = 0;
  selectedSubject: string | null = null;
  selectedSubjectId: Number | null = null;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  selectedDate: string | null = null;
  selectedFormat: string | null = "Очное";
  selectedAddress: string | null = null;
  selectedInstitute: string | null = null;
  selectedInstituteId: Number | null = null;
  selectedClassroom: string | null = null;
  selectedTeachers: string[] = [];
  selectedLink: string | null = null;

  // Состояния для выпадающих списков
  isDropdownOpen: { [key: string]: boolean } = {
    subject: false,
    startTime: false,
    endTime: false,
    address: false,
    institute: false,
    classroom: false,
    teachers: false
  };

  // Данные для выпадающих списков
  subjects: Subject[] = [];
  startTimes: string[] = ['08:30', '10:15', '12:00', '14:15', '16:00', '17:40', '19:15', '20:50'];
  endTimes: string[] = ['10:00', '11:45', '13:30', '15:45', '17:30', '19:10', '20:45', '22:20'];
  addresses: string[] = [];
  institutes: Institute[] = [];
  classrooms: string[] = ['101', '102', '103'];

  constructor(private pairsService: PairsService, private subjectsService: SubjectsService, private otherService: OtherService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.otherService.getInstitutes().subscribe((response) => this.institutes = response);
    this.otherService.getAddresses().subscribe((response) => this.addresses = response);
    this.subjectsService.getAllSubjects().subscribe((response) => this.subjects = response.content)

    const pairId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL
    this.lessonId = Number(pairId);
    this.isEditMode = !!pairId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.loadPairData(Number(pairId));
    }
  }

  loadPairData(id: number): void {
    this.pairsService.getPairById(id).subscribe(pair => {

      // this.pairName = pair.course_name;
      this.selectedAddress = pair.address;
      this.selectedStartTime = format(pair.date_start, 'HH:mm'); // Форматируем время начала
      this.selectedEndTime = format(pair.date_end, 'HH:mm'); // Форматируем время окончания
      this.selectedDate = format(pair.date_start, 'yyyy-MM-dd'); // Преобразуем дату в нужный формат
      this.selectedSubject = pair.course_name;
      this.selectedSubjectId = pair.course_id;

      // this.selectedInstitute = pair.;
      // this.selectedTeachers = pair.teachers || []; Добавить обработку института и преподавателей у предмета при редактировании
    });
  }

  // Переключение выпадающих списков
  toggleDropdown(key: string): void {
    this.isDropdownOpen[key] = !this.isDropdownOpen[key];
    // Закрыть остальные списки
    for (const dropdown in this.isDropdownOpen) {
      if (dropdown !== key) {
        this.isDropdownOpen[dropdown] = false;
      }
    }
  }

  // Выбор элемента из выпадающего списка
  selectOption(key: string, value: string | any): void {
    switch (key) {
      case 'subject':
        this.selectedSubject = value.name;
        this.selectedSubjectId = value.course_id
        break;
      case 'startTime':
        this.selectedStartTime = value;
        break;
      case 'endTime':
        this.selectedEndTime = value;
        break;
      case 'address':
        this.selectedAddress = value;
        break;
      case 'institute':
        this.selectedInstitute = value.institute_full_name;
        this.selectedInstituteId = value.institute_id;
        break;
      case 'classroom':
        this.selectedClassroom = value;
        break;
      case 'teachers':
        if (!this.selectedTeachers.includes(value)) {
          this.selectedTeachers.push(value);
        }
        break;
    }
    this.isDropdownOpen[key] = false; // Закрыть список
  }

  // Удаление преподавателя
  removeTeacher(teacher: string, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedTeachers = this.selectedTeachers.filter(t => t !== teacher);
  }

  //
  onSubmit(): void {
    if (!this.selectedDate || !this.selectedStartTime || !this.selectedEndTime) {
      console.error('Дата, время начала или окончания не выбраны!');
      return;
    }

    const startDateTime = `${this.selectedDate}T${this.selectedStartTime}:00`;
    const endDateTime = `${this.selectedDate}T${this.selectedEndTime}:00`;

    let requestData: any;

    if (this.selectedFormat === 'Очное') {
      requestData = {
        startDateTime,
        endDateTime,
        address: this.selectedAddress || '',
        cabinet: this.selectedClassroom || '',
        name_lesson: this.pairName,
        course_id: this.selectedSubjectId,
        full_time: true,
        institute_id: this.selectedInstituteId
      };
    } else if (this.selectedFormat === 'Онлайн') {
      requestData = {
        startDateTime,
        endDateTime,
        name_lesson: this.pairName,
        course_id: this.selectedSubjectId,
        full_time: false,
        link: this.selectedLink || ''
      };
    }

    if (this.isEditMode) {
      this.pairsService.editPair(this.lessonId, requestData).subscribe({
        next: (response) => {

          setTimeout(() => {
            this.router.navigate(['/pairs']);
          }, 500);
        },
        error: (err) => {
          console.error('Ошибка редактирования:', err);
        }
      });
    }

    else {
      this.pairsService.createPair(requestData).subscribe({
        next: (response) => {

          setTimeout(() => {
            this.router.navigate(['/pairs']);
          }, 500);
        },
        error: (err) => {
          console.error('Ошибка создания:', err);
        }
      });
    }
  }
}
