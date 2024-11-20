import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  searchTerm: string = '';

  rows = [
    { subject: 'Информационные технологии', place: 'Мира 32 / Р888', rating: 5.0 },
    { subject: 'Теория и практика программной инженерии', place: 'Ленина Пушкина авбабав ква 12214', rating: 3.5 },
    { subject: 'Физика', place: 'Мира 32 / Р888', rating: 1.0 },
    { subject: 'История', place: 'Мира 32 / Р888', rating: 4.2 },
    { subject: 'Химия', place: 'Мира 32 / Р888', rating: 2.3 },
    { subject: 'Биология', place: 'Мира 32 / Р888', rating: 4.7 }
  ];

  currentPage = 0;
  itemsPerPage = 5;

  get filteredRows() {
    return this.rows.filter(row =>
      row.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedRows() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRows.slice(start, end);
  }

  get totalPages() {
    const filteredRows = this.filteredRows;
    return Math.max(Math.ceil(filteredRows.length / this.itemsPerPage), 1);
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

  // Сброс текущей страницы при изменении поискового запроса
  onSearchTermChange() {
    this.currentPage = 0;
  }
}
