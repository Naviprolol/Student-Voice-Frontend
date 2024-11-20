import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CustomDatePickerComponent } from "../../shared/custom-datepicker/custom-datepicker.component";
import { RouterModule } from '@angular/router';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [HeaderComponent, CustomDatePickerComponent, RouterModule, CommonModule],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.css'
})
export class SubjectDetailsComponent implements OnInit {

  currentWeekRange: string = '';
  newDate: Date = new Date();
  isCalendarOpen: boolean = false;

  currentPage = 0;
  itemsPerPage = 5;

  rows = [
    { subject: 'Информационные технологии', date: '28.10.2024', time: '19:15-20:45', status: 'Запланировано', rating: 5.0, teacher: 'Иванович' },
    { subject: 'Математика', date: '29.10.2024', time: '09:00-10:30', status: 'Запланировано', rating: 3.5, teacher: 'Иванов Иван Ивановиffasdasч' },
    { subject: 'Физика', date: '30.10.2024', time: '11:00-12:30', status: 'Завершено', teacher: 'Иван Иванович' },
    { subject: 'История', date: '31.10.2024', time: '13:00-14:30', status: 'Запланировано', rating: 4.2, teacher: 'Иванов Иван Иванович' },
    { subject: 'Химия', date: '01.11.2024', time: '15:00-16:30', status: 'Завершено', rating: 2.3, teacher: 'Иванов Иван Иванович' },
    { subject: 'Биология', date: '02.11.2024', time: '17:00-18:30', status: 'Запланировано', rating: 4.7, teacher: 'Иванов Иван Иванович' }
  ];

  ngOnInit() {
    this.setNewWeekRange(this.newDate);
  }

  setNewWeekRange(newDate: Date) {
    const start = startOfWeek(newDate, { weekStartsOn: 1 });
    const end = endOfWeek(newDate, { weekStartsOn: 1 });
    this.currentWeekRange = `${format(start, 'd', { locale: ru })} - ${format(end, 'd MMM yyyy', { locale: ru })}`;
  }

  // Переход на предыдущую неделю
  goToPreviousWeek() {
    this.newDate = subWeeks(this.newDate, 1);
    this.setNewWeekRange(this.newDate);
  }

  // Переход на следующую неделю
  goToNextWeek() {
    this.newDate = addWeeks(this.newDate, 1);
    this.setNewWeekRange(this.newDate);
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen
  }

  // Таблица (Отображение и пагинация)

  get paginatedRows() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.rows.slice(start, end);
  }

  get totalPages() {
    return Math.max(Math.ceil(this.rows.length / this.itemsPerPage), 1);
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
}
