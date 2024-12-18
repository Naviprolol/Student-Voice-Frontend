import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';
import { FormsModule } from '@angular/forms';
import { RatingRow, Subject } from '../../interfaces/interfaces';
import { RouterModule } from '@angular/router';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CustomDatePickerComponent, FormsModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  rating: number = 5.0; // Рейтинг от 0 до 5
  starsArray: number[] = [1, 2, 3, 4, 5]; // Массив для пяти звезд

  rows: Subject[] = [];
  searchTerm: string = '';
  totalPages: number = 0;
  totalElements: number = 0;

  currentPage = 0;
  itemsPerPage = 5;

  ratingRows: RatingRow[] = [
    { title: 'Подача материала', rating: 4.8 },
    { title: 'Полезность материала', rating: 2.7 },
    { title: 'Взаимодействие со студентами', date: '30.10.2024', time: '11:00-12:30', status: 'Запланировано', rating: 5.0 },
    { title: 'Аудитория и оборудование', rating: 1.3 },
    { title: 'Атмосфера на паре', rating: 4.0 }
  ];

  schedule = [
    { dayOfWeek: this.getDayOfWeek(0), date: this.getFormattedDate(0), pairs: [{ time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }] },
    { dayOfWeek: this.getDayOfWeek(1), date: this.getFormattedDate(1), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
    { dayOfWeek: this.getDayOfWeek(2), date: this.getFormattedDate(2), pairs: [] }
  ];

  constructor(private subjectsService: SubjectsService) { }

  ngOnInit() {
    this.loadSubjects(this.currentPage);

    this.ratingRows.forEach(row => {
      const fullStars = Math.floor(row.rating); // Полные звезды
      const hasHalfStar = row.rating % 1 > 0; // Есть ли половинчатая звезда
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Пустые звезды

      row.goodStars = Array(fullStars)
      row.halfStar = hasHalfStar; // Boolean, есть ли половинчатая звезда
      row.badStars = Array(emptyStars).fill(1); // Массив из emptyStars элементов
    });
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

  // Получаем название дня недели на основе смещения
  getDayOfWeek(dayOffset: number): string {
    const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);
    return daysOfWeek[date.getDay()];
  }

  // Получаем текущую дату с учетом смещения
  getFormattedDate(dayOffset: number): string {
    const date = new Date();
    date.setDate(date.getDate() + dayOffset);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${day}.${month}`;
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
}
