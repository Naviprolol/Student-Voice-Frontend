import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PairsService } from '../../services/pairs.service';
import { Pair, Review } from '../../interfaces/interfaces';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

@Component({
  selector: 'app-pair-details',
  standalone: true,
  imports: [HeaderComponent, RouterModule, CommonModule],
  templateUrl: './pair-details.component.html',
  styleUrl: './pair-details.component.css'
})
export class PairDetailsComponent implements OnInit {

  // Настройка для пагинации, если настройка ВКЛЮЧЕНА
  currentPage = 0;
  itemsPerPage = 5;

  // Настройка для пагинации, если настройка ОТКЛЮЧЕНА
  studentsPerPage = 24; // 8 студентов * 3 столбца
  columns = 3; // Количество столбцов
  paginatedStudents: any[] = []; // Массив для текущей страницы студентов
  currentPage_off = 0; // Текущая страниц

  setting: boolean = true // Настройка
  toggleSetting() {
    this.setting = !this.setting;
    if (!this.setting) {
      this.updatePaginatedStudents();
    }
  }

  pair!: Pair
  lessonId!: number;

  stars = Array(5).fill(0); // Для отрисовки 5 звезд

  rows: Review[] = [];
  totalPages: number = 0
  totalElements: number = 0;
  turn_expanded: boolean = false;

  constructor(private pairsService: PairsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.lessonId = params['id'];
      this.loadPair(this.lessonId);
      this.loadReviews(this.lessonId, this.currentPage)
      this.updatePaginatedStudents();
    });
  }

  // Подгрузка отзывов о паре
  loadReviews(lesson_id: number, page: number) {
    this.pairsService.getReviewsByPair(lesson_id, page, 5).subscribe(reviews => {
      this.rows = reviews.content
      this.totalPages = reviews.totalPages;
      this.totalElements = reviews.totalElements;
      if (!this.turn_expanded) {
        this.turn_expanded = true;
        this.rows.forEach(row => {
          row.expanded = false;
        });
      }
    })
  }

  // Загрузка пары с сервера
  loadPair(lesson_id: number): void {
    this.pairsService.getPairById(lesson_id).subscribe(pair => {
      this.pair = pair;
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

  // РАЗВЕРНУТЬ / СВЕРНУТЬ ОТЗЫВ
  toggleReview(row: any) {
    row.expanded = !row.expanded;
  }


  // Пагинация для таблицы когда настройка ОТКЛЮЧЕНА

  updatePaginatedStudents() {
    const start = this.currentPage_off * this.studentsPerPage;
    const end = start + this.studentsPerPage;

    // Получаем студентов только с полем `fio`
    const currentStudents = this.rows.slice(start, end).map(student => ({
      fio: student.fio || 'Неизвестное имя'
    }));

    // Формируем массив для отображения по колонкам
    this.paginatedStudents = Array.from({ length: this.columns }, (_, colIndex) =>
      currentStudents.slice(colIndex * 8, (colIndex + 1) * 8)
    );
  }

  get totalPages_off() {
    return Math.max(Math.ceil(this.rows.length / this.studentsPerPage), 1);
  }

  goToNextPage_off() {
    if (this.currentPage_off < Math.ceil(this.rows.length / this.studentsPerPage) - 1) {
      this.currentPage_off++;
      this.updatePaginatedStudents();
    }
  }

  goToPreviousPage_off() {
    if (this.currentPage_off > 0) {
      this.currentPage_off--;
      this.updatePaginatedStudents();
    }
  }

  // Метод для форматирования даты
  formatDate(date: string): string {
    const parsedDate = new Date(date);

    // Форматируем дату и время
    const formattedDate = format(parsedDate, 'dd.MM.yyyy', { locale: ru }); // 27.11.2024
    const formattedTime = format(parsedDate, 'HH:mm'); // 22:45
    let formattedDay = format(parsedDate, 'EEE', { locale: ru });
    formattedDay = formattedDay.charAt(0).toUpperCase() + formattedDay.charAt(1)

    return `${formattedDate} ${formattedDay} ${formattedTime}`;
  }

  formatReviewTime(date: string): string {
    const parsedDate = new Date(date);
    return format(parsedDate, 'dd.MM.yyyy, HH:mm', { locale: ru });
  }
}
