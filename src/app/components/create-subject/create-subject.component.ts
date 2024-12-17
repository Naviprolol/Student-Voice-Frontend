import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectsService } from '../../services/subjects.service';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
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

  subjectForm!: FormGroup;
  addresses: string[] = ['Адрес 1', 'Адрес 2', 'Адрес 3', 'Адрес 4'];
  institutes: { institute_id: number; institute_full_name: string }[] = [];
  selectedInstituteId: number | null = null;
  teachers: string[] = ['Преподаватель 1', 'Преподаватель 2', 'Преподаватель 3', 'Преподаватель 4'];

  constructor(private subjectsService: SubjectsService, private route: ActivatedRoute, private otherService: OtherService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();

    this.otherService.getInstitutes().subscribe((response) => {
      this.institutes = response;
    });

    const subjectId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL
    this.isEditMode = !!subjectId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.loadSubjectData(Number(subjectId));
    }
  }

  initForm(): void {
    this.subjectForm = this.fb.group({
      course_name: ['', Validators.required], // Название предмета
      address: ['', Validators.required], // Адрес
      institute_id: [null, Validators.required], // ID института
      isConstantlyLink: [false], // Чекбокс
      professor_id: [null], // Временный мок
    });
  }

  loadSubjectData(id: number): void {
    this.subjectsService.getSubjectById(id).subscribe(subject => {
      this.subjectName = subject.name;
      this.selectedAddress = subject.address;
      // this.selectedInstitute = subject.;
      // this.selectedTeachers = subject.teachers || []; Добавить обработку института и преподавателей у предмета при редактировании
    });
  }

  onSubmit(): void {
    if (this.subjectForm.valid) {
      const formData = this.subjectForm.value;
      console.log('Данные для отправки:', formData);

      // После реализации метода отправки:
      // this.subjectsService.createSubject(formData).subscribe((response) => {
      //   console.log('Предмет создан:', response);
      // });
    } else {
      console.error('Форма заполнена некорректно!');
    }
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
}
