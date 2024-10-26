import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Исправлено на styleUrls
})
export class LoginComponent {
  first_page: boolean = true;
  second_page: boolean = !this.first_page;

  isFilledUser = false; // Состояние заполненного поля для имени пользователя
  isInvalidUser = false; // Состояние валидации (ошибка) для имени пользователя

  isFilledPassword = false; // Состояние заполненного поля для пароля
  isInvalidPassword = false; // Состояние валидации (ошибка) для пароля

  openEye: boolean = true;
  passwordType: string = 'password'; // Тип инпута для пароля, изначально 'password'

  toggleEye() {
    this.openEye = !this.openEye
    this.passwordType = this.openEye ? 'password' : 'text'; // Переключение типа инпута
  }

  openSecondPage() {
    this.first_page = !this.first_page;
  }

  onFocus(type: 'user' | 'password') {
    if (type === 'user') {
      this.isInvalidUser = false;
    } else {
      this.isInvalidPassword = false;
    }
  }

  onBlur(type: 'user' | 'password') {
    if (type === 'user') {
      if (!this.isFilledUser) {
        this.isInvalidUser = true; // Показываем ошибку, если поле пустое
      }
    } else {
      if (!this.isFilledPassword) {
        this.isInvalidPassword = true; // Показываем ошибку, если поле пустое
      }
    }
  }

  onInput(event: any, type: 'user' | 'password') {
    if (type === 'user') {
      this.isFilledUser = event.target.value.length > 0;
      if (this.isFilledUser) {
        this.isInvalidUser = false; // Если есть текст, ошибки нет
      }
    } else {
      this.isFilledPassword = event.target.value.length > 0;
      if (this.isFilledPassword) {
        this.isInvalidPassword = false; // Если есть текст, ошибки нет
      }
    }
  }
}
