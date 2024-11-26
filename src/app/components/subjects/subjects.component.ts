import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubjectsService } from '../../services/subjects.service';
import { Subject } from '../../interfaces/interfaces';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent implements OnInit {

  totalPages: number = 0;
  rows: Subject[] = [];

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.loadSubjects(this.currentPage);
  }


  loadSubjects(page: number): void {
    this.subjectsService.getSubjectsByPage(page).subscribe(response => {
      this.rows = response.content; // Теперь TypeScript знает, что это массив Subject[]
      this.totalPages = response.totalPages; // totalPages существует в ApiResponse
    });
  }

  searchTerm: string = '';

  // rows = [
  //   { subject: 'Информационные технологии', place: 'Мира 32 / Р888', rating: 5.0 },
  //   { subject: 'Теория и практика программной инженерии', place: 'Ленина Пушкина авбабав ква 12214', rating: 3.5 },
  //   { subject: 'Физика', place: 'Мира 32 / Р888', rating: 1.0 },
  //   { subject: 'История', place: 'Мира 32 / Р888', rating: 4.2 },
  //   { subject: 'Химия', place: 'Мира 32 / Р888', rating: 2.3 },
  //   { subject: 'Биология', place: 'Мира 32 / Р888', rating: 4.7 }
  // ];

  currentPage = 0;
  itemsPerPage = 5;

  get filteredRows() {
    return this.rows.filter(row =>
      row.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedRows() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRows.slice(start, end);
  }

  // get totalPages() {
  //   const filteredRows = this.filteredRows;
  //   return Math.max(Math.ceil(filteredRows.length / this.itemsPerPage), 1);
  // }


  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadSubjects(this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSubjects(this.currentPage);
    }
  }

  // Сброс текущей страницы при изменении поискового запроса
  onSearchTermChange() {
    this.currentPage = 0;
  }
}
