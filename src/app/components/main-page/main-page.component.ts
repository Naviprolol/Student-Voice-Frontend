import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CustomDatePickerComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  @Input() rating: number = 0; // Рейтинг от 0 до 5
  starsArray: number[] = [1, 2, 3, 4, 5]; // Массив для пяти звезд

  ratingRows = [
    { title: 'Подача материала', rating: 4.8 },
    { title: 'Полезность материала', rating: 2.7 },
    { title: 'Взаимодействие со студентами', date: '30.10.2024', time: '11:00-12:30', status: 'Запланировано', rating: 5.0 },
    { title: 'Аудитория и оборудование', rating: 1.5 },
    { title: 'Атмосфера на паре', rating: 4.0 }
  ];

  schedule = [
    { dayOfWeek: this.getDayOfWeek(0), date: this.getFormattedDate(0), pairs: [{ time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }, { time: '8:30-9:00', location: 'Мира 32/Р232', subject: 'Информационная безопасность' }] },
    { dayOfWeek: this.getDayOfWeek(1), date: this.getFormattedDate(1), pairs: [{ time: '10:00-11:30', location: 'Мира 32/Р232', subject: 'Математика' }] },
    { dayOfWeek: this.getDayOfWeek(2), date: this.getFormattedDate(2), pairs: [] }
  ];

  subjects = [
    { subject: 'Информационные технологии', place: 'Мира 32 / Р888', rating: 5.0 },
    { subject: 'Теория и практика программной инженерии', place: 'Ленина Пушкина авбабав ква 12214', rating: 3.5 },
    { subject: 'Физика', place: 'Мира 32 / Р888', rating: 1.0 },
    { subject: 'История', place: 'Мира 32 / Р888', rating: 4.2 },
    { subject: 'Химия', place: 'Мира 32 / Р888', rating: 2.3 },
    { subject: 'Биология', place: 'Мира 32 / Р888', rating: 4.7 }
  ];

  currentPage = 0;
  itemsPerPage = 5;

  ngOnInit() {

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

  // get filteredRows() {
  //   return this.subjects.filter(row =>
  //     row.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }

  get paginatedRows() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.subjects.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.subjects.length / this.itemsPerPage);
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
