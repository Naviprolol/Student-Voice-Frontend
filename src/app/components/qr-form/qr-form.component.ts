import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-form.component.html',
  styleUrl: './qr-form.component.css'
})
export class QrFormComponent {

  setting: boolean = true;

  questions: string[] = [
    'подачей материала?',
    'полезностью материала?',
    'взаимодействием со студентами?',
    'аудиторией и оборудованием?',
    'атмосферой на паре?'
  ];

  ratings = [
    { value: 1, text: '1 - совсем не удовлетворен(-а)' },
    { value: 2, text: '2' },
    { value: 3, text: '3' },
    { value: 4, text: '4' },
    { value: 5, text: '5 - полностью удовлетворен(-а)' }
  ];

  selectedRatings: number[] = Array(this.questions.length).fill(0);

  selectRating(questionIndex: number, ratingValue: number): void {
    this.selectedRatings[questionIndex] = ratingValue;
    console.log('Текущие оценки:', this.selectedRatings); // Проверяем обновление массива
  }

  isRatingSelected(questionIndex: number, ratingValue: number): boolean {
    return this.selectedRatings[questionIndex] === ratingValue;
  }

}
