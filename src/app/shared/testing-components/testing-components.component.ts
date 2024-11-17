import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';

@Component({
  selector: 'app-testing-components',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CustomDatePickerComponent],
  templateUrl: './testing-components.component.html',
  styleUrl: './testing-components.component.css'
})
export class TestingComponentsComponent {
  isActiveBlueToggle: boolean = false;
  isActiveGradientToggle: boolean = false;

  isFilled = false; // Состояние заполненного поля
  isInvalid = false; // Состояние валидации (ошибка)

  isCalendarOpen: boolean = false;
  currentWeekRange: string = '';

  ngOnInit() {

  }

  toggleBlue() {
    this.isActiveBlueToggle = !this.isActiveBlueToggle;
  }

  toggleGradient() {
    this.isActiveGradientToggle = !this.isActiveGradientToggle;
  }

  onFocus() {
    // Действие при фокусе (когда пользователь начинает вводить текст)
    this.isInvalid = false;
  }

  onBlur() {
    // Действие при выходе из фокуса (проверка на валидацию)
    if (!this.isFilled) {
      this.isInvalid = true; // Показываем ошибку, если поле пустое
    }
  }

  onInput(event: any) {
    // Проверяем, введен ли текст
    this.isFilled = event.target.value.length > 0;
    if (this.isFilled) {
      this.isInvalid = false; // Если есть текст, ошибки нет
    }
  }
}
