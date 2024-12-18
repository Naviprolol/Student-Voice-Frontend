import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { SubjectsService } from '../../services/subjects.service';
import { OtherService } from '../../services/other.service';
import { CreateSubjectApiResponse, Institute, Professor } from '../../interfaces/interfaces';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent implements OnInit {

  // Режим работы: true = редактирование, false = создание
  isEditMode!: boolean;

  isDropdownOpen: { [key: string]: boolean } = { address: false, institute: false, teachers: false };
  selectedAddress: string | null = null;
  selectedInstitute: string | null = null;
  selectedTeachers: string[] | null = null;

  subjectName: string = '';

  isCheckboxActive: boolean = false;

  addresses: string[] = [];
  teachers: Professor[] = [];
  institutes: Institute[] = [];

  courseId!: number;

  constructor(private subjectsService: SubjectsService, private route: ActivatedRoute, private otherService: OtherService, private router: Router) { }

  ngOnInit(): void {
    this.otherService.getInstitutes().subscribe((response) => this.institutes = response);
    this.otherService.getAddresses().subscribe((response) => this.addresses = response);
    this.otherService.getProfessors().subscribe((response) => this.teachers = response)

    const subjectId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL
    this.courseId = Number(subjectId);
    this.isEditMode = !!subjectId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.loadSubjectData(Number(subjectId));
    }
  }

  loadSubjectData(id: number): void {
    this.subjectsService.getSubjectById(id).subscribe(subject => {
      this.subjectName = subject.name;
      this.selectedAddress = subject.address;
      // this.selectedInstitute = subject.;
      // this.selectedTeachers = subject.teachers || []; Добавить обработку института и преподавателей у предмета при редактировании
    });
  }

  toggleDropdown(type: string): void {
    Object.keys(this.isDropdownOpen).forEach((key) => {
      if (key !== type) this.isDropdownOpen[key] = false;
    });
    this.isDropdownOpen[type] = !this.isDropdownOpen[type];
  }

  toggleCheckbox(): void {
    this.isCheckboxActive = !this.isCheckboxActive;
  }

  selectOption(field: string, value: string) {
    if (field === 'address') {
      this.selectedAddress = value;
    } else if (field === 'institute') {
      this.selectedInstitute = value;
    } else if (field === 'teachers') {
      if (!this.selectedTeachers) this.selectedTeachers = [];
      const index = this.selectedTeachers.indexOf(value);
      if (index === -1) {
        this.selectedTeachers.push(value);
      } else {
        this.selectedTeachers.splice(index, 1);
      }
    }
    this.isDropdownOpen[field] = false;
  }

  selectClear(field: string, event: MouseEvent): void {
    event.stopPropagation();
    if (field === 'address') {
      this.selectedAddress = null;
    } else if (field === 'institute') {
      this.selectedInstitute = null;
    } else if (field === 'teachers') {
      this.selectedTeachers = null;
    }
  }

  removeTeacher(teacher: string, event: MouseEvent) {
    event.stopPropagation();
    if (this.selectedTeachers) {
      this.selectedTeachers = this.selectedTeachers.filter(t => t !== teacher);
    }
  }



  onSubmit(): void {
    // Если `selectedInstitute` — строка, нужно найти ID института

    if (!this.selectedInstitute || !this.selectedAddress || !this.selectedTeachers) { return; }

    const selectedInstituteId = this.institutes.find(inst => inst.institute_full_name === this.selectedInstitute)?.institute_id || null;
    const selectedTeachersId = this.selectedTeachers!
      .map(teacherName => this.teachers.find(teacher => teacher.professor_fio === teacherName)?.professor_id)
      .filter(id => id !== undefined) as number[];

    // Собираем данные для отправки
    const payload: CreateSubjectApiResponse = {
      course_name: this.subjectName,
      address: this.selectedAddress,
      institute_id: selectedInstituteId,
      isConstantlyLink: this.isCheckboxActive,
      professor_ids: selectedTeachersId, // Пока временно передаем мок
    };

    // Проверяем валидность данных
    if (!payload.course_name || !payload.address || !payload.institute_id || !payload.professor_ids) {
      console.error('Форма заполнена некорректно. Проверьте обязательные поля.');
      return;
    }


    if (this.isEditMode) {
      this.subjectsService.editSubject(this.courseId, payload).subscribe({
        next: (response) => {

          setTimeout(() => {
            this.router.navigate(['/subjects']);
          }, 500);
        },
        error: (err) => {
          console.error('Ошибка создания:', err);
        }
      });
    }

    else {
      this.subjectsService.createSubject(payload).subscribe({
        next: (response) => {

          setTimeout(() => {
            this.router.navigate(['/subjects']);
          }, 500);
        },
        error: (err) => {
          console.error('Ошибка создания:', err);
        }
      });
    }
  }
}
