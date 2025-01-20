import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PairsService } from '../../../services/pairs.service';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';
import { QrService } from '../../../services/qr.service';

@Component({
  selector: 'app-qr-filled',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './qr-filled.component.html',
  styleUrl: './qr-filled.component.css'
})
export class QrFilledComponent {
  isEditMode: boolean = false;

  setting: boolean = false;
  hours: number = 1; // Начальное значение часов
  minutes: number = 15; // Начальное значение минут

  // Состояния для выпадающих списков
  isDropdownOpen: { [key: string]: boolean } = {
    subject: false,
    startTime: false,
    endTime: false,
    address: false,
    institute: false,
    classroom: false,
    teachers: false
  };

  selectedSubject: string | null = null;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  selectedDate: string = '';
  selectedFormat: string | null = null;
  selectedAddress: string | null = null;
  selectedInstitute: string | null = null;

  lessonId: string | null = null;

  // Данные для выпадающих списков
  subjects: string[] = [];
  startTimes: string[] = [];
  endTimes: string[] = [];
  addresses: string[] = [];
  institutes: string[] = [];
  classrooms: string[] = [];
  teachers: string[] = [];

  qrCodeImage: string | null = null;

  isModalOpen: boolean = false; // Контролирует отображение модалки
  pairs: any[] = [];
  isLoading: boolean = true;

  constructor(private pairsService: PairsService, private route: ActivatedRoute, private qrService: QrService) { }

  ngOnInit(): void {
    const pairId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL
    this.lessonId = pairId;

    this.isEditMode = !!pairId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.setting = true;
      this.loadPairData(Number(pairId));
      this.getQR(Number(pairId))
    }

    else if (!this.isEditMode) {
      this.pairsService.getPairsForQR().subscribe((pairs) => {
        this.pairs = pairs;
        if (pairs && pairs.length > 0) {
          this.subjects = pairs.map((pair: { course_and_lesson: any; }) => pair.course_and_lesson); // Список всех предметов
          this.startTimes = pairs.map((pair: { startDateTime: any; }) => format(pair.startDateTime, 'HH:mm'));
          this.endTimes = pairs.map((pair: { endDateTime: any; }) => format(pair.endDateTime, 'HH:mm'));
          this.addresses = pairs.map((pair: { address: any; }) => pair.address);
          this.institutes = pairs.map((pair: { institute_full_name: any; }) => pair.institute_full_name);
        }
        this.isLoading = false;
      })
    }
  }

  loadPairData(id: number): void {
    this.pairsService.getPairById(id).subscribe(pair => {

      this.selectedSubject = pair.course_name;
      this.selectedAddress = pair.address;
      this.selectedStartTime = format(pair.date_start, 'HH:mm'); // Форматируем время начала
      this.selectedEndTime = format(pair.date_end, 'HH:mm'); // Форматируем время окончания
      this.selectedDate = format(pair.date_start, 'dd.MM.yyyy'); // Преобразуем дату в нужный формат
      this.selectedSubject = pair.course_name;


      // this.selectedInstitute = pair.;
      // this.selectedTeachers = pair.teachers || []; Добавить обработку института и преподавателей у предмета при редактировании
    });
  }

  getQR(id: number): void {
    this.qrService.getQrByPairId(id).subscribe(response => {
      this.qrCodeImage = `data:image/png;base64,${response}`;
    })
  }

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

  // Переключение выпадающих списков
  toggleDropdown(key: string): void {
    this.isDropdownOpen[key] = !this.isDropdownOpen[key];
    // Закрыть остальные списки
    for (const dropdown in this.isDropdownOpen) {
      if (dropdown !== key) {
        this.isDropdownOpen[dropdown] = false;
      }
    }
  }

  selectOption(key: string, value: string): void {
    if (key === 'subject') {
      const selectedPair = this.pairs.find((pair: { course_and_lesson: string; }) => pair.course_and_lesson === value);

      if (selectedPair) {
        this.selectedSubject = selectedPair.course_and_lesson;
        this.selectedStartTime = format(selectedPair.startDateTime, 'HH:mm');
        this.selectedEndTime = format(selectedPair.endDateTime, 'HH:mm');
        this.selectedDate = format(selectedPair.startDateTime, 'yyyy-MM-dd');
        this.selectedInstitute = selectedPair.institute_full_name;
        this.selectedAddress = selectedPair.address;
        this.lessonId = selectedPair.lesson_id;
        this.selectedFormat = selectedPair.full_time ? 'Очное' : 'Онлайн';
        this.isDropdownOpen[key] = false;

        this.getQR(Number(this.lessonId))
      }
    }
    else {
      // Обработка других вариантов выбора
      switch (key) {
        case 'startTime':
          this.selectedStartTime = value;
          break;
        case 'endTime':
          this.selectedEndTime = value;
          break;
        case 'address':
          this.selectedAddress = value;
          break;
        case 'institute':
          this.selectedInstitute = value;
          break;
      }
      this.isDropdownOpen[key] = false; // Закрыть список
    }
  }


  formatDate(date: string): string {
    if (!date) {
      return ''; // Если дата пустая, возвращаем пустую строку
    }

    try {
      // Парсим дату из формата "DD.MM.YYYY"
      const parsedDate = parse(date, 'dd.MM.yyyy', new Date());

      // Проверяем, успешно ли распарсилась дата
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date format');
      }

      // Форматируем день недели и делаем первую букву заглавной
      let formattedDay = format(parsedDate, 'EEE', { locale: ru });
      return formattedDay = formattedDay.charAt(0).toUpperCase() + formattedDay.charAt(1)
    } catch (error) {
      console.error('Ошибка в формате даты:', error);
      return ''; // Возвращаем пустую строку при ошибке
    }
  }


  // Скачка куаркода
  downloadQrCode(): void {
    if (!this.qrCodeImage) {
      console.error('QR-код отсутствует.');
      return;
    }

    // Создаем элемент изображения
    const img = new Image();
    img.src = this.qrCodeImage;

    // Ждем, пока изображение загрузится
    img.onload = () => {
      // Создаем canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Рисуем изображение на canvas
        ctx.drawImage(img, 0, 0);

        // Конвертируем canvas в Blob и загружаем
        canvas.toBlob((blob) => {
          if (!blob) {
            console.error('Ошибка создания Blob.');
            return;
          }

          // Создаем ссылку для скачивания
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'qr-code.jpg'; // Имя файла
          link.click();

          // Освобождаем память
          URL.revokeObjectURL(link.href);
        }, 'image/jpeg'); // Указываем тип файла
      }
    };

    img.onerror = () => {
      console.error('Ошибка загрузки изображения.');
    };
  }

  copyLinkToClipboard(): void {
    const domain = window.location.origin;
    const link = `${domain}/form/${this.lessonId}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => {
          alert('Ссылка успешно скопирована!');
        })
        .catch(err => {
          console.error('Ошибка копирования ссылки:', err);
        });
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = link;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Ссылка на форму отзыва успешно скопирована!');
    }
  }

  enableTemporaryLink(): void {
    this.qrService.createQrTimer(Number(this.lessonId), this.hours, this.minutes)
      .subscribe({
        next: () => {
          this.isModalOpen = true; // Открываем модалку
          setTimeout(() => {
            this.isModalOpen = false;
          }, 2000);
        },
        error: (err) => console.error('Ошибка включения таймера:', err)
      });
  }

}
