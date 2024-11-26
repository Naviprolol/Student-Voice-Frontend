import { Component, OnInit } from '@angular/core';
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
    this.setting = !this.setting
  }


  rows = [
    { FIO: 'Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: 'Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' }
  ];

  stars = Array(5).fill(0); // Для отрисовки 5 звезд

  ngOnInit() {
    this.updatePaginatedStudents();
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

  // РАЗВЕРНУТЬ / СВЕРНУТЬ ОТЗЫВ
  toggleReview(row: any) {
    row.expanded = !row.expanded;
  }


  // Пагинация для таблицы когда настройка ОТКЛЮЧЕНА

  updatePaginatedStudents() {
    const start = this.currentPage_off * this.studentsPerPage;
    const end = start + this.studentsPerPage;
    const currentStudents = this.rows.slice(start, end);

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
}
