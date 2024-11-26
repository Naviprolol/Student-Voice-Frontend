import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.css'
})
export class CreateSubjectComponent {
  isDropdownOpen: { [key: string]: boolean } = { address: false, institute: false, teachers: false };
  selectedAddress: string | null = null;
  selectedInstitute: string | null = null;
  selectedTeachers: string[] | null = null;

  addresses: string[] = ['Адрес 1', 'Адрес 2', 'Адрес 3', 'Адрес 4', 'Адрес 5', 'Адрес 6', 'Адрес 7', 'Адрес 8'];
  institutes: string[] = ['Институт 1', 'Институт 2', 'Институт 3'];
  teachers: string[] = ['Преподаватель 1', 'Преподаватель 2', 'Преподаватель 3', 'Преподаватель 4'];

  subjectName: string = '';

  isCheckboxActive: boolean = false;


  toggleDropdown(type: string): void {
    // Закрываем все открытые выпадающие списки
    Object.keys(this.isDropdownOpen).forEach((key) => {
      if (key !== type) this.isDropdownOpen[key] = false;
    });
    // Переключаем состояние текущего выпадающего списка
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
      // Проверяем, есть ли уже преподаватель в списке
      const index = this.selectedTeachers.indexOf(value);
      if (index === -1) {
        this.selectedTeachers.push(value); // Добавляем, если не выбран
      } else {
        this.selectedTeachers.splice(index, 1); // Удаляем, если уже выбран
      }
    }
    this.isDropdownOpen[field] = false;
  }

  selectClear(field: string, event: MouseEvent): void {
    event.stopPropagation(); // Остановить распространение события
    if (field === 'address') {
      this.selectedAddress = null;
    } else if (field === 'institute') {
      this.selectedInstitute = null;
    } else if (field === 'teachers') {
      this.selectedTeachers = null;
    }
  }

  // Метод для удаления преподавателя из выбранных
  removeTeacher(teacher: string, event: MouseEvent) {
    event.stopPropagation(); // Остановить распространение события
    if (this.selectedTeachers) {
      this.selectedTeachers = this.selectedTeachers.filter(t => t !== teacher);
    }
  }
}
