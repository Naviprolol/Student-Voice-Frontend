import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pairs',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, CustomDatePickerComponent, RouterModule],
  templateUrl: './pairs.component.html',
  styleUrl: './pairs.component.css'
})
export class PairsComponent implements OnInit {

  searchTerm: string = '';
  currentWeekRange: string = '';
  currentDate: Date = new Date(); // Текущая выбранная дата
  newDate: Date = new Date();
  isCalendarOpen: boolean = false;

  rows = [
    { subject: 'Информационные технологии', date: '28.10.2024', time: '19:15-20:45', status: 'Запланировано', rating: 5.0 },
    { subject: 'Математика', date: '29.10.2024', time: '09:00-10:30', status: 'Запланировано', rating: 3.5 },
    { subject: 'Физика', date: '30.10.2024', time: '11:00-12:30', status: 'Запланировано' },
    { subject: 'История', date: '31.10.2024', time: '13:00-14:30', status: 'Запланировано', rating: 4.2 },
    { subject: 'Химия', date: '01.11.2024', time: '15:00-16:30', status: 'Запланировано', rating: 2.3 },
    { subject: 'Биология', date: '02.11.2024', time: '17:00-18:30', status: 'Запланировано', rating: 4.7 }
  ];

  currentPage = 0;
  itemsPerPage = 5;

  ngOnInit() {
    this.setNewWeekRange(this.currentDate);
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

  get paginatedRows() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.rows.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.rows.length / this.itemsPerPage);
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
