import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PairsService } from '../../services/pairs.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-qr-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qr-form.component.html',
  styleUrl: './qr-form.component.css'
})
export class QrFormComponent implements OnInit {

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

  pairAddress: string = '';
  pairName: string = '';
  pairTimeStart: string = '';
  pairTimeEnd: string = '';
  pairDate: string = '';

  constructor(private pairsService: PairsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const lessonId = this.route.snapshot.paramMap.get('id');
    this.pairsService.getPairById(Number(lessonId)).subscribe(pair => {
      this.pairAddress = pair.address;
      this.pairName = pair.course_name;


      const dateStart = new Date(pair.date_start);
      const dateEnd = new Date(pair.date_end);

      this.pairTimeStart = format(dateStart, 'HH:mm'); // Форматируем в "10:15"
      this.pairTimeEnd = format(dateEnd, 'HH:mm');     // Форматируем в "11:45"
      this.pairDate = format(dateStart, 'dd.MM.yyyy'); // Форматируем в "13.12.2024"
    })
  }

  selectRating(questionIndex: number, ratingValue: number): void {
    this.selectedRatings[questionIndex] = ratingValue;
    console.log('Текущие оценки:', this.selectedRatings); // Проверяем обновление массива
  }

  isRatingSelected(questionIndex: number, ratingValue: number): boolean {
    return this.selectedRatings[questionIndex] === ratingValue;
  }

}
