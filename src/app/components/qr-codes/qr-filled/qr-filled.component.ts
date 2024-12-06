import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qr-filled',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './qr-filled.component.html',
  styleUrl: './qr-filled.component.css'
})
export class QrFilledComponent {

  hours: number = 1; // Начальное значение часов
  minutes: number = 15; // Начальное значение минут

  // Увеличить часы
  increaseHours(): void {
    this.hours = (this.hours + 1) % 24; // Ограничиваем значение 24 часами
  }

  // Уменьшить часы
  decreaseHours(): void {
    this.hours = (this.hours - 1 + 24) % 24; // Учитываем отрицательные значения
  }

  // Увеличить минуты
  increaseMinutes(): void {
    this.minutes = (this.minutes + 15) % 60; // Ограничиваем значение 60 минутами
  }

  // Уменьшить минуты
  decreaseMinutes(): void {
    this.minutes = (this.minutes - 15 + 60) % 60; // Учитываем отрицательные значения
  }
}
