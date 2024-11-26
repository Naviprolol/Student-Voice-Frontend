import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  // Отображение таблицы
  rows = [
    { FIO: '1Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '2Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '3Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '4Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '5Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '6Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '7Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '8Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '9Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '10Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '11Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '12Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '13Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '14Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '15Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '16Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '17Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '18Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '19Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '20Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '21Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '22Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '23Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '24Иванов Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '25Иванов Иван Иванович', date: '28.10.2024', time: '19:15', status: 'нировано', rating: 5.0, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '26Иванов Иван Иванович', date: '29.10.2024', time: '09:00', status: 'Запланировано', rating: 3.5, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '27Иванов Иван Иванович', date: '30.10.2024', time: '11:00', status: 'Запланировано', expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '28Иванов Иван Иванович', date: '31.10.2024', time: '13:00', status: 'Запланировано', rating: 4.2, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '29Иванов Иван Иванович', date: '01.11.2024', time: '15:00', status: 'Запланировано', rating: 2.3, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' },
    { FIO: '30Ивановyhntr Иван Иванович', date: '02.11.2024', time: '17:00', status: 'Запланировано', rating: 4.7, expanded: false, reviewText: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa' }
  ];

  currentPage = 0;
  studentsPerPage = 24; // 12 в каждом столбце
  paginatedStudents: any[] = []; // Массив для текущей страницы студентов
  columns = 2; // Количество столбцов

  ngOnInit() {
    this.updatePaginatedStudents();
    if (!this.setting) {
      this.selectedType = null;
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedStudents();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedStudents();
    }
  }

  updatePaginatedStudents() {
    const start = this.currentPage * this.studentsPerPage;
    const end = start + this.studentsPerPage;
    const currentStudents = this.rows.slice(start, end);

    const studentsPerColumn = Math.ceil(currentStudents.length / this.columns);

    this.paginatedStudents = Array.from({ length: this.columns }, (_, colIndex) =>
      currentStudents.slice(colIndex * studentsPerColumn, (colIndex + 1) * studentsPerColumn)
    );
  }

  get totalPages() {
    return Math.max(Math.ceil(this.rows.length / this.studentsPerPage), 1);
  }

}
