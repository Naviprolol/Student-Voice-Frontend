import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PairsService } from '../../services/pairs.service';
import { Review } from '../../interfaces/interfaces';

@Component({
  selector: 'app-pair-visit-list',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './pair-visit-list.component.html',
  styleUrl: './pair-visit-list.component.css'
})
export class PairVisitListComponent implements OnInit {

  setting: boolean = false // Настройка
  toggleSetting() {
    this.setting = !this.setting;
    if (!this.setting) {
      this.selectedType = null;
    }
    else {
      this.selectedType = 'Отзывы'
    }
  }

  formats: string[] = ['CSV', 'XLSX']; // Список форматов
  selectedFormat: string = 'CSV'; // Выбранный формат

  types: string[] = ['Отзывы', 'Список студентов', 'Список студентов с отзывами'];
  selectedType: string | null = 'Отзывы';

  selectFormat(format: string): void {
    this.selectedFormat = format; // Сохраняем выбранный формат
  }

  selectType(type: string | null): void {
    this.selectedType = type; // Сохраняем выбранный тип
  }

  lessonId!: number;
  rows!: Review[];
  totalPages!: number
  totalElements: number = 0;

  currentPage = 0;
  studentsPerPage = 24; // 12 в каждом столбце
  paginatedStudents: any[] = []; // Массив для текущей страницы студентов
  columns = 2; // Количество столбцов

  constructor(private route: ActivatedRoute, private pairsService: PairsService) { }

  ngOnInit() {
    if (!this.setting) {
      this.selectedType = null;
    }
    this.lessonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadReviews(this.lessonId, this.currentPage)
  }

  // Подгрузка отзывов о паре
  loadReviews(lesson_id: number, page: number) {
    this.pairsService.getReviewsByPair(lesson_id, page, this.studentsPerPage).subscribe(reviews => {
      // Убедимся, что контент существует
      if (reviews.content && reviews.content.length > 0) {
        this.rows = reviews.content.map(review => ({
          ...review,
          fio: review.fio, // Поле `fio` из ответа сервера
        }));
      } else {
        this.rows = [];
      }
      this.totalPages = reviews.totalPages || 1;
      this.totalElements = reviews.totalElements;

      // Обновляем пагинацию после загрузки
      this.updatePaginatedStudents();
    });
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadReviews(this.lessonId, this.currentPage)
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadReviews(this.lessonId, this.currentPage)
    }
  }

  updatePaginatedStudents() {
    // Обрабатываем только если есть данные
    if (!this.rows || this.rows.length === 0) {
      this.paginatedStudents = [];
      return;
    }

    const start = this.currentPage * this.studentsPerPage;
    const end = start + this.studentsPerPage;
    const currentStudents = this.rows.slice(start, end); // Безопасное использование slice

    const studentsPerColumn = Math.ceil(currentStudents.length / this.columns);

    this.paginatedStudents = Array.from({ length: this.columns }, (_, colIndex) =>
      currentStudents.slice(colIndex * studentsPerColumn, (colIndex + 1) * studentsPerColumn)
    );
  }

}
