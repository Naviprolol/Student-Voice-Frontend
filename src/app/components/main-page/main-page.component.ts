import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  isActiveBlueToggle: boolean = false;
  isActiveGradientToggle: boolean = false;

  isFilled = false; // Состояние заполненного поля
  isInvalid = false; // Состояние валидации (ошибка)

  daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  dates: number[] = [];
  emptyDays: number[] = [];
  currentMonth: string = 'октябрь';
  currentYear: number = 2024;
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedRange: string = '';

  ngOnInit() {
    const today = new Date();
    this.currentMonth = today.toLocaleString('default', { month: 'long' });
    this.currentYear = today.getFullYear();
    this.generateDates();
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



  generateDates() {
    const firstDayOfMonth = new Date(this.currentYear, this.getCurrentMonthIndex(), 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.getCurrentMonthIndex() + 1, 0).getDate();

    // Пустые ячейки, чтобы месяц начинался с правильного дня недели
    this.emptyDays = Array(firstDayOfMonth ? firstDayOfMonth - 1 : 6).fill(0);

    // Заполняем числами
    this.dates = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  goToPreviousMonth() {
    if (this.getCurrentMonthIndex() === 0) {
      this.currentYear--;
      this.currentMonth = 'декабрь';
    } else {
      this.currentMonth = new Date(this.currentYear, this.getCurrentMonthIndex() - 1, 1)
        .toLocaleString('default', { month: 'long' });
    }
    this.generateDates();
  }

  goToNextMonth() {
    if (this.getCurrentMonthIndex() === 11) {
      this.currentYear++;
      this.currentMonth = 'январь';
    } else {
      this.currentMonth = new Date(this.currentYear, this.getCurrentMonthIndex() + 1, 1)
        .toLocaleString('default', { month: 'long' });
    }
    this.generateDates();
  }

  getCurrentMonthIndex(): number {
    return new Date(`${this.currentMonth} 1, ${this.currentYear}`).getMonth();
  }

  selectDate(day: number) {
    const selectedDate = new Date(this.currentYear, this.getCurrentMonthIndex(), day);

    if (!this.startDate || (this.startDate && this.endDate)) {
      // Начинаем выбор диапазона заново
      this.startDate = selectedDate;
      this.endDate = null;
    } else if (this.startDate && !this.endDate) {
      // Завершаем выбор диапазона
      if (selectedDate > this.startDate) {
        this.endDate = selectedDate;
      } else {
        this.endDate = this.startDate;
        this.startDate = selectedDate;
      }
      this.updateSelectedRange();
    }
  }

  isStartDate(day: number): boolean {
    return this.startDate?.getDate() === day && this.startDate?.getMonth() === this.getCurrentMonthIndex();
  }

  isEndDate(day: number): boolean {
    return this.endDate?.getDate() === day && this.endDate?.getMonth() === this.getCurrentMonthIndex();
  }

  isInRange(day: number): boolean {
    if (!this.startDate || !this.endDate) return false;
    const date = new Date(this.currentYear, this.getCurrentMonthIndex(), day);
    return date > this.startDate && date < this.endDate;
  }

  updateSelectedRange() {
    if (this.startDate && this.endDate) {
      const startDay = this.startDate.getDate();
      const endDay = this.endDate.getDate();
      const month = this.startDate.toLocaleString('default', { month: 'short' });
      this.selectedRange = `${startDay} - ${endDay} ${month}. ${this.currentYear} г.`;
    }
  }
}
