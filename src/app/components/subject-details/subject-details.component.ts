import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CustomDatePickerComponent } from "../../shared/custom-datepicker/custom-datepicker.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CommonModule } from '@angular/common';
import { PairsService } from '../../services/pairs.service';
import { Pair } from '../../interfaces/interfaces';
import { SubjectsService } from '../../services/subjects.service';

@Component({
  selector: 'app-subject-details',
  standalone: true,
  imports: [HeaderComponent, CustomDatePickerComponent, RouterModule, CommonModule],
  templateUrl: './subject-details.component.html',
  styleUrl: './subject-details.component.css'
})
export class SubjectDetailsComponent implements OnInit {

  currentWeekRange: string = '';
  newDate: Date = new Date();
  isCalendarOpen: boolean = false;

  currentPage = 0;
  itemsPerPage = 5;
  rows: Pair[] = [];
  totalPages: number = 0;

  subjectName: string = '';

  courseId!: number;

  constructor(private pairsService: PairsService, private subjectService: SubjectsService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.setNewWeekRange(this.newDate);

    this.route.params.subscribe(params => {
      this.courseId = params['id'];
      this.loadPairsOfSubject(this.courseId, this.currentPage);
    });
  }

  // Загрузка пар с сервера
  loadPairsOfSubject(courseId: number, page: number): void {
    this.pairsService.getPairsOfSubject(courseId, page).subscribe(response => {
      this.rows = response.content;
      this.totalPages = response.totalPages;
      this.subjectName = response.content[0].course_name;
    });
  }

  setNewWeekRange(newDate: Date) {
    const start = startOfWeek(newDate, { weekStartsOn: 1 });
    const end = endOfWeek(newDate, { weekStartsOn: 1 });
    this.currentWeekRange = `${format(start, 'd', { locale: ru })} - ${format(end, 'd MMM yyyy', { locale: ru })}`;
  }

  // Переход на предыдущую неделю
  goToPreviousWeek() {
    this.newDate = subWeeks(this.newDate, 1);
    this.setNewWeekRange(this.newDate);
  }

  // Переход на следующую неделю
  goToNextWeek() {
    this.newDate = addWeeks(this.newDate, 1);
    this.setNewWeekRange(this.newDate);
  }

  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen
  }

  // Таблица (Отображение и пагинация)

  // get totalPages() {
  //   return Math.max(Math.ceil(this.rows.length / this.itemsPerPage), 1);
  // }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadPairsOfSubject(this.courseId, this.currentPage);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadPairsOfSubject(this.courseId, this.currentPage);
    }
  }

  // Формат даты у пары
  formatDateTime(dateStart: string, dateEnd: string): string {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);

    const formattedDate = format(startDate, 'dd.MM.yyyy', { locale: ru }); // 28.10.2024
    const startTime = format(startDate, 'HH:mm'); // 19:15
    const endTime = format(endDate, 'HH:mm'); // 20:45

    return `${formattedDate} ${startTime}-${endTime}`;
  }
}
