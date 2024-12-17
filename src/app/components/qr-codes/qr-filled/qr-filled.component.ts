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

  // Данные для выпадающих списков
  subjects: string[] = ['Математика', 'Физика', 'Программирование', 'Программирование 3', 'Программировани 5', 'Программирование 6', 'Программирование', 'Программирование', 'Программирование'];
  startTimes: string[] = ['08:30', '10:15', '12:00', '14:15', '16:00', '17:40', '19:15', '20:50'];
  endTimes: string[] = ['10:00', '11:45', '13:30', '15:45', '17:30', '19:10', '20:45', '22:20'];
  addresses: string[] = ['Корпус 1', 'Корпус 2', 'Корпус 3'];
  institutes: string[] = ['Институт ИТ', 'Институт физики', 'Институт математики'];
  classrooms: string[] = ['101', '102', '103'];
  teachers: string[] = ['Иванов Иван', 'Петров Петр', 'Сидорова Анна'];

  qrCodeImage: string | null = null;

  constructor(private pairsService: PairsService, private route: ActivatedRoute, private qrService: QrService) { }

  ngOnInit(): void {
    const pairId = this.route.snapshot.paramMap.get('id'); // Получение ID предмета из URL

    this.qrService.getQrByPairId(pairId!).subscribe(response => {
      this.qrCodeImage = `data:image/png;base64,${response}`;
    })

    this.isEditMode = !!pairId; // Если ID есть, режим редактирования
    if (this.isEditMode) {
      this.setting = true;
      this.loadPairData(Number(pairId));
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

  // Выбор элемента из выпадающего списка
  selectOption(key: string, value: string): void {
    switch (key) {
      case 'subject':
        this.selectedSubject = value;
        break;
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

}
