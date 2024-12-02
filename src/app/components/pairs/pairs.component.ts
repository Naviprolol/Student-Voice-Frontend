import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';
import { RouterModule } from '@angular/router';
import { Pair } from '../../interfaces/interfaces';
import { PairsService } from '../../services/pairs.service';

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
  newDate: Date = new Date();
  isCalendarOpen: boolean = false;

  rows: Pair[] = []; // Данные, полученные с сервера
  totalPages: number = 0;

  currentPage = 0;
  itemsPerPage = 5;

  constructor(private pairsService: PairsService) { }

  ngOnInit() {
    this.setNewWeekRange(this.newDate);
    this.loadPairs(this.currentPage);
  }

  // Загрузка пар с сервера
  loadPairs(page: number): void {
    this.pairsService.getPairsByPage(page).subscribe(response => {
      this.rows = response.content;
      this.totalPages = response.totalPages;
    });
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

  // Фильтрация пар
  get filteredRows() {
    return this.rows.filter(row =>
      row.course_name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Постраничное отображение пар
  // get paginatedRows() {
  //   const start = this.currentPage * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   return this.filteredRows.slice(start, end);
  // }

  // get totalPages() {
  //   return Math.max(Math.ceil(this.filteredRows.length / this.itemsPerPage), 1);
  // }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPairs(this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPairs(this.currentPage);
    }
  }

  onSearchTermChange() {
    this.currentPage = 0;
  }


  // Формат даты у пары
  formatDateTime(dateStart: string, dateEnd: string): string {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const formattedDate = format(startDate, 'dd.MM.yyyy', { locale: ru }); // 28.10.2024
    const startTime = format(startDate, 'HH:mm'); // 19:15
    const endTime = format(endDate, 'HH:mm'); // 20:45

    return `${formattedDate} ${startTime}-${endTime}`;
  }

}
