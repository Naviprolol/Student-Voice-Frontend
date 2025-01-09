import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { CustomDatePickerComponent } from "../../shared/custom-datepicker/custom-datepicker.component";
import { RouterModule } from '@angular/router';
import { addDays, addWeeks, endOfWeek, format, startOfWeek, subWeeks } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-teacher-schedule',
  standalone: true,
  imports: [HeaderComponent, CustomDatePickerComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent implements OnInit {

  currentWeekRange: string = '';
  newDate: Date = new Date();
  isCalendarOpen: boolean = false;

  schedule: any[] = []; // Расписание, которое будет отображаться

  constructor(private otherService: OtherService) { }

  ngOnInit() {
    this.setNewWeekRange(this.newDate);
    this.updateSchedule();

    // Прокрутка наверх страницы при загрузке
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Получение данных расписания с сервера
    this.otherService.getFullSchedule().subscribe((schedule) => {
      this.schedule = this.transformSchedule(schedule);
    });
  }

  // Преобразование данных из API в необходимый формат
  transformSchedule(apiSchedule: any[]): any[] {
    return apiSchedule.map(day => ({
      dayOfWeek: this.getDayOfWeek(new Date(day.date).getDay()),
      date: format(new Date(day.date), 'dd.MM'),
      pairs: day.listLessons.map((lesson: { date_start: string | number | Date; date_end: string | number | Date; address: any; course_name: any; }) => ({
        time: `${format(new Date(lesson.date_start), 'HH:mm')} - ${format(new Date(lesson.date_end), 'HH:mm')}`,
        location: lesson.address,
        subject: lesson.course_name,
      }))
    }));
  }

  // Получаем название дня недели
  getDayOfWeek(dayIndex: number): string {
    const daysOfWeek = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return daysOfWeek[dayIndex];
  }

  // Обновление диапазона недели
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
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  // Обновление расписания (может пригодиться в будущем)
  updateSchedule() {
    // Логика обновления расписания, если нужно
  }
}
