import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubjectsService } from '../../services/subjects.service';
import { Subject } from '../../interfaces/interfaces';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject as RxSubject } from 'rxjs';

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent implements OnInit {

  totalPages: number = 0;
  totalElements: number = 0;
  rows: Subject[] = [];

  searchTerm: string = '';

  currentPage = 0;
  itemsPerPage = 5;

  isModalOpen: boolean = false; // Контролирует отображение модалки
  courseIdToDelete: number | null = null; // Хранит ID предмета для удаления

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.loadSubjects(this.currentPage);
  }


  // Метод для загрузки предметов
  loadSubjects(page: number): void {
    const searchText = this.searchTerm.trim();
    this.subjectsService.getSubjectsByPage(page, searchText).subscribe(response => {
      this.rows = response.content;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  // Обновление поиска
  onSearchClick(): void {
    this.currentPage = 0; // Сбрасываем страницу
    this.loadSubjects(this.currentPage);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearchClick(); // Отправляем запрос
    }
  }

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


  // Метод для открытия модального окна
  openDeleteModal(courseId: number): void {
    this.isModalOpen = true; // Открываем модалку
    this.courseIdToDelete = courseId; // Сохраняем ID предмета
  }

  // Метод для закрытия модального окна
  closeModal(): void {
    this.isModalOpen = false; // Закрываем модалку
    this.courseIdToDelete = null; // Очищаем ID предмета
  }

  // Метод для подтверждения удаления
  confirmDelete(): void {
    if (this.courseIdToDelete !== null) {
      this.subjectsService.deleteSubject(this.courseIdToDelete).subscribe({
        next: () => {
          this.currentPage = 0;
          this.loadSubjects(this.currentPage); // Обновляем список предметов
          this.closeModal(); // Закрываем модалку
        },
        error: (err) => {
          console.error('Ошибка удаления:', err);
        },
      });
    }
  }
}
