import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  addMonths, startOfMonth, endOfMonth, eachWeekOfInterval, eachDayOfInterval, format,
  isSameMonth, startOfWeek, endOfWeek, isSameDay, addDays, Locale
} from 'date-fns';
import { ru } from 'date-fns/locale';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.css']
})
export class CustomDatePickerComponent {
  @Output() weekSelected = new EventEmitter<string>();

  currentMonth: Date = new Date();
  weeks: Date[][] = [];
  selectedWeek: Date[] | null = null;

  constructor() {
    this.generateCalendar();
  }

  format(date: Date, dateFormat: string): string {
    return format(date, dateFormat, { locale: ru });
  }

  previousMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, -1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.generateCalendar();
  }

  generateCalendar(): void {
    const start = startOfMonth(this.currentMonth);
    const end = endOfMonth(this.currentMonth);

    const startWeek = startOfWeek(start, { weekStartsOn: 1, locale: ru });
    const endWeek = endOfWeek(end, { weekStartsOn: 1, locale: ru });

    this.weeks = eachWeekOfInterval({ start: startWeek, end: endWeek }).map(weekStart =>
      eachDayOfInterval({ start: addDays(weekStart, 1), end: addDays(weekStart, 7) })
    );
  }




  selectWeek(date: Date): void {
    this.selectedWeek = eachDayOfInterval({
      start: startOfWeek(date, { weekStartsOn: 1, locale: ru }),
      end: endOfWeek(date, { weekStartsOn: 1, locale: ru }),
    });

    const startOfSelectedWeek = this.selectedWeek[0];
    const endOfSelectedWeek = this.selectedWeek[this.selectedWeek.length - 1];
    const weekRange = `${format(startOfSelectedWeek, 'd', { locale: ru })} - ${format(endOfSelectedWeek, 'd MMM yyyy', { locale: ru })}`;

    this.weekSelected.emit(weekRange);
  }

  isDateInSelectedWeek(date: Date): boolean {
    return this.selectedWeek ? this.selectedWeek.some(d => isSameDay(d, date)) : false;
  }

  isSameMonth(date: Date): boolean {
    return isSameMonth(date, this.currentMonth);
  }
}
