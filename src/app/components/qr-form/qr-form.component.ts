import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PairsService } from '../../services/pairs.service';
import { format } from 'date-fns';
import { QrService } from '../../services/qr.service';

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
  lessonId: string | null = null;

  fio: string = '';
  comment: string = '';
  teachers: string[] = []; // Инициализируем пустым массивом

  constructor(private pairsService: PairsService, private route: ActivatedRoute, private qrService: QrService, private router: Router) { }

  ngOnInit(): void {
    this.lessonId = this.route.snapshot.paramMap.get('id');

    this.qrService.getFormInfo(Number(this.lessonId)).subscribe(response => {
      this.pairName = response.course_name;
      const dateStart = new Date(response.start_date_time);
      const dateEnd = new Date(response.end_date_time);

      this.pairTimeStart = format(dateStart, 'HH:mm'); // Форматируем в "10:15"
      this.pairTimeEnd = format(dateEnd, 'HH:mm');     // Форматируем в "11:45"
      this.pairDate = format(dateStart, 'dd.MM.yyyy'); // Форматируем в "13.12.2024"

      // Распаковка списка преподавателей
      this.teachers = response.professor_list.map((professor: { professor_fio: any; }) => professor.professor_fio);
    })
  }

  selectRating(questionIndex: number, ratingValue: number): void {
    this.selectedRatings[questionIndex] = ratingValue;
  }

  isRatingSelected(questionIndex: number, ratingValue: number): boolean {
    return this.selectedRatings[questionIndex] === ratingValue;
  }

  // Метод для получения имени вопроса на основе текста (если это необходимо)
  getQuestionName(question: string): string {
    switch (question) {
      case 'подачей материала?':
        return 'Подача материала';
      case 'полезностью материала?':
        return 'Полезность материала';
      case 'взаимодействием со студентами?':
        return 'Взаимодействие со студентами';
      case 'аудиторией и оборудованием?':
        return 'Аудитория и оборудование';
      case 'атмосферой на паре?':
        return 'Атмосфера на паре';
      default:
        return question;
    }
  }

  onSubmit() {
    // Создаем объект category_review_list с подставленными значениями
    const categoryReviewList = this.questions.map((question, index) => {
      return {
        name: this.getQuestionName(question),  // Имя вопроса, например "Подача материала"
        value: this.selectedRatings[index]     // Значение рейтинга, выбранное пользователем
      };
    });

    // Формируем запрос
    const requestData = {
      fio: this.fio,
      comment: this.comment,
      category_review_list: categoryReviewList  // Заполняем динамически
    };

    // Отправка запроса
    this.qrService.sendReviewOfPair(Number(this.lessonId), requestData).subscribe(
      () => {
        this.router.navigate([`/pair/${this.lessonId}`]);
      },
      (error) => {
        console.error("Ошибка при отправке отзыва:", error);
      }
    );
  }

}
