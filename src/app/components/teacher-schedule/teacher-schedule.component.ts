import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CustomDatePickerComponent } from "../../shared/custom-datepicker/custom-datepicker.component";
import { RouterModule } from '@angular/router';
import { addDays, addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [HeaderComponent, CustomDatePickerComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './teacher-schedule.component.html',
  styleUrl: './teacher-schedule.component.css'
})
export class TeacherScheduleComponent {

  currentWeekRange: string = '';
  newDate: Date = new Date();

  isCalendarOpen: boolean = false;

  schedule = [
    { dayOfWeek: this.getDayOfWeek(0), date: this.getFormattedDate(1), pairs: [{ time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }] },
    { dayOfWeek: this.getDayOfWeek(1), date: this.getFormattedDate(2), pairs: [] },
    { dayOfWeek: this.getDayOfWeek(2), date: this.getFormattedDate(3), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
    { dayOfWeek: this.getDayOfWeek(3), date: this.getFormattedDate(4), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
    { dayOfWeek: this.getDayOfWeek(4), date: this.getFormattedDate(5), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
    { dayOfWeek: this.getDayOfWeek(5), date: this.getFormattedDate(6), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
  ];

  ngOnInit() {
    this.setNewWeekRange(this.newDate);
    this.updateSchedule()

    // Прокрутка наверх страницы при загрузке
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // РАСПИСАНИЕ
  // Получаем название дня недели на основе смещения от начала недели
  getDayOfWeek(dayOffset: number): string {
    const daysOfWeek = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
    const startOfCurrentWeek = startOfWeek(this.newDate, { weekStartsOn: 0 }); // начало текущей недели
    const date = addDays(startOfCurrentWeek, dayOffset); // смещение от начала недели
    return daysOfWeek[date.getDay()];  // getDay() возвращает индекс дня недели от 0 (воскресенье), что сдвигает дни
  }

  getFormattedDate(dayOffset: number): string {
    const startOfCurrentWeek = startOfWeek(this.newDate, { weekStartsOn: 1 }); // начало текущей недели
    const date = addDays(startOfCurrentWeek, dayOffset); // смещение от начала недели

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${day}.${month}`; // Форматируем дату
  }

  // Обновляем расписание на основе даты
  updateSchedule() {
    this.schedule = this.schedule.map((day, index) => {
      return {
        dayOfWeek: this.getDayOfWeek(index), // Получаем день недели
        date: this.getFormattedDate(index),  // Получаем дату
        pairs: day.pairs // Сохраняем текущие пары для дня
      };
    });
  }


  // КАСТОМНЫЙ КАЛЕНДАРЬ
  // Обновление диапазона недели
  setNewWeekRange(newDate: Date) {
    const start = startOfWeek(newDate, { weekStartsOn: 1 });
    const end = endOfWeek(newDate, { weekStartsOn: 1 });
    this.currentWeekRange = `${format(start, 'd', { locale: ru })} - ${format(end, 'd MMM yyyy', { locale: ru })}`;
  }

  // Переход на предыдущую неделю
  goToPreviousWeek() {
    this.newDate = subWeeks(this.newDate, 1); // Смещаем дату на неделю назад
    this.setNewWeekRange(this.newDate); // Обновляем отображение диапазона недели
    this.updateSchedule(); // Обновляем расписание
  }

  // Переход на следующую неделю
  goToNextWeek() {
    this.newDate = addWeeks(this.newDate, 1); // Смещаем дату на неделю вперед
    this.setNewWeekRange(this.newDate); // Обновляем отображение диапазона недели
    this.updateSchedule(); // Обновляем расписание
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen
  }
}
