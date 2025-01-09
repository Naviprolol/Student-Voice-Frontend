import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { CustomDatePickerComponent } from '../../shared/custom-datepicker/custom-datepicker.component';
import { FormsModule } from '@angular/forms';
import { Pair, RatingRow, Subject } from '../../interfaces/interfaces';
import { RouterModule } from '@angular/router';
import { SubjectsService } from '../../services/subjects.service';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CustomDatePickerComponent, FormsModule, RouterModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {

  rating: number | null = null;
  starsArray: number[] = [1, 2, 3, 4, 5]; // Массив для пяти звезд

  rows: Subject[] = [];
  searchTerm: string = '';
  totalPages: number = 0;
  totalElements: number = 0;

  goodStars: any[] = [];
  halfStars: boolean = false;
  badStars: any[] = [];

  currentPage = 0;
  itemsPerPage = 5;

  notificationPairs: Pair[] = [];

  schedule: any[] = [];

  isModalOpen: boolean = false;
  courseIdToDelete: number | null = null;

  constructor(private subjectsService: SubjectsService, private otherService: OtherService) { }

  ngOnInit() {
    this.loadSubjects(this.currentPage);

    this.otherService.rating$.subscribe((rating) => {
      this.rating = rating;

      if (this.rating !== null) {
        const fullStars = Math.floor(this.rating); // Полные звезды
        const hasHalfStar = this.rating % 1 > 0; // Есть ли половинчатая звезда
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Пустые звезды

        this.goodStars = Array(fullStars)
        this.halfStars = hasHalfStar; // Boolean, есть ли половинчатая звезда
        this.badStars = Array(emptyStars).fill(1); // Массив из emptyStars элементов
      }
    })

    this.otherService.getNotificationPairs().subscribe((pairs: Pair[]) => {
      this.notificationPairs = pairs.map(pair => {
        const startDate = new Date(pair.start_date_time);
        const endDate = new Date(pair.end_date_time);

        // Форматируем дату и время
        const formattedDate = startDate.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
        });

        const startTime = startDate.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const endTime = endDate.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
        });

        // Добавляем отформатированные данные в объект
        return {
          ...pair,
          formattedDateTime: `${formattedDate} ${startTime}-${endTime}`, // новая строка времени
        };
      });
    });

    this.otherService.getShortSchedule().subscribe((schedule) => {
      this.schedule = schedule.map((day: any) => {
        // Преобразуем каждую дату в нужный формат
        return {
          dayOfWeek: this.getDayOfWeek(day.date), // День недели
          date: this.formatDate(day.date), // Преобразуем дату в формат "ДД.ММ"
          pairs: day.listLessons.map((lesson: any) => ({
            time: `${this.formatTime(lesson.date_start)}-${this.formatTime(lesson.date_end)}`, // Время пары
            location: lesson.address, // Адрес
            subject: lesson.course_name // Название предмета
          }))
        };
      });
    });

  }

  // Форматирование даты в "ДД.ММ"
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  }

  // Форматирование времени в "ЧЧ:ММ"
  formatTime(dateString: string): string {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
  getDayOfWeek(dateString: string): string {
    const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
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

  updateModeus() {
    this.otherService.updatePairsFromModeus(1, '1', '1').subscribe(() => {
      console.log('Отправили запро обновления модеуса!')
    })
  }


  // Удаление предмета
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
