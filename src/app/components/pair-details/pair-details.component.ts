import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pair-details',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './pair-details.component.html',
  styleUrl: './pair-details.component.css'
})
export class PairDetailsComponent {

  currentPage = 0;
  itemsPerPage = 5;


  rows = [
    { subject: 'Информационные технологии', date: '28.10.2024', time: '19:15-20:45', status: 'нировано', rating: 5.0 },
    { subject: 'Математика', date: '29.10.2024', time: '09:00-10:30', status: 'Запланировано', rating: 3.5 },
    { subject: 'Физика', date: '30.10.2024', time: '11:00-12:30', status: 'Запланировано' },
    { subject: 'История', date: '31.10.2024', time: '13:00-14:30', status: 'Запланировано', rating: 4.2 },
    { subject: 'Химия', date: '01.11.2024', time: '15:00-16:30', status: 'Запланировано', rating: 2.3 },
    { subject: 'Биология', date: '02.11.2024', time: '17:00-18:30', status: 'Запланировано', rating: 4.7 }
  ];


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
