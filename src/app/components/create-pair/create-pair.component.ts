import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PairsService } from '../../services/pairs.service';
import { format, parseISO } from 'date-fns';
import { OtherService } from '../../services/other.service';
import { Institute } from '../../interfaces/interfaces';

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
  selectedSubject: string | null = null;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  selectedDate: string | null = null;
  selectedFormat: string | null = null;
  selectedAddress: string | null = null;
  selectedInstitute: string | null = null;
  selectedClassroom: string | null = null;
  selectedTeachers: string[] = [];

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
  subjects: string[] = ['Математика', 'Физика', 'Программирование', 'Программирование 3', 'Программировани 5', 'Программирование 6', 'Программирование', 'Программирование', 'Программирование'];
  startTimes: string[] = ['08:30', '10:15', '12:00', '14:15', '16:00', '17:40', '19:15', '20:50'];
  endTimes: string[] = ['10:00', '11:45', '13:30', '15:45', '17:30', '19:10', '20:45', '22:20'];
  addresses: string[] = [];
  institutes: Institute[] = [];
  classrooms: string[] = ['101', '102', '103'];
  teachers: string[] = ['Иванов Иван', 'Петров Петр', 'Сидорова Анна'];

  constructor(private pairsService: PairsService, private otherService: OtherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.otherService.getInstitutes().subscribe((response) => this.institutes = response);
    this.otherService.getAddresses().subscribe((response) => this.addresses = response);

    const pairId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL
    this.isEditMode = !!pairId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.loadPairData(Number(pairId));
    }
  }

  loadPairData(id: number): void {
    this.pairsService.getPairById(id).subscribe(pair => {
      console.log(pair)

      // this.pairName = pair.course_name;
      this.selectedAddress = pair.address;
      this.selectedStartTime = format(pair.date_start, 'HH:mm'); // Форматируем время начала
      this.selectedEndTime = format(pair.date_end, 'HH:mm'); // Форматируем время окончания
      this.selectedDate = format(pair.date_start, 'yyyy-MM-dd'); // Преобразуем дату в нужный формат
      this.selectedSubject = pair.course_name;

      console.log(this.selectedDate)

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
  selectOption(key: string, value: string): void {
    switch (key) {
      case 'subject':
        this.selectedSubject = value;
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
        this.selectedInstitute = value;
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

    // Объединяем дату и время для начала и конца
    const localStartDate = new Date(`${this.selectedDate}T${this.selectedStartTime}:00`);
    const localEndDate = new Date(`${this.selectedDate}T${this.selectedEndTime}:00`);

    // Преобразуем в ISO строку без учета сдвига времени
    const startDateTime = new Date(localStartDate.getTime() - localStartDate.getTimezoneOffset() * 60000).toISOString();
    const endDateTime = new Date(localEndDate.getTime() - localEndDate.getTimezoneOffset() * 60000).toISOString();

    const requestData = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      address: this.selectedAddress || '',
      cabinet: this.selectedClassroom || '',
      link: '',
      name_lesson: this.pairName,
      course_id: 0, // Укажи ID курса, если требуется
      full_time: this.selectedFormat === 'Очное',
      institute_id: 0,
    };

    console.log('Данные для отправки:', requestData);

    // Пример вызова сервиса для отправки данных
    // this.pairsService.createPair(requestBody).subscribe(response => {
    //   console.log('Успешный ответ:', response);
    // });
  }
}
