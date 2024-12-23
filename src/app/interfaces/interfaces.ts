export interface RatingRow {
  title: string;
  rating: number;
  goodStars?: number[]; // Массив для полных звёзд
  halfStar?: boolean;   // Флаг для половинчатой звезды
  badStars?: number[];  // Массив для пустых звёзд
  date?: string;        // Опциональные свойства для других данных
  time?: string;
  status?: string;
}

export interface Subject {
  name: string;
  address: string;
  course_id: number;

  rating: number;
}

export interface GetSubjectsApiResponse {
  content: Subject[];
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetSubjectApiResponse {
  name: string;
  address: string;
  course_id: number;
}

export interface Pair {
  status: string;
  course_id: number;
  lesson_id: number;
  course_name: string;
  date_start: string; // или Date, если хочешь преобразовать
  date_end: string;   // или Date

  rating: number;
  address: string;
}

export interface GetPairsApiResponse {
  content: Pair[];
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface StatisticRating {
  rating: number;         // Оценка по конкретной категории
  category_name: string;  // Название категории
}

export interface Review {
  fio: string;                      // ФИО автора отзыва
  comment: string;                  // Текст отзыва
  lesson_review_id: number;         // Идентификатор отзыва
  create_time: string;              // Время создания отзыва
  rating_result: number;            // Итоговый рейтинг
  statistic_rating_list: StatisticRating[]; // Список статистики по оценкам
  expanded: boolean;
}

export interface GetReviewsApiResponse {
  content: Review[];
  pageable: {
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: { empty: boolean; sorted: boolean; unsorted: boolean };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Institute {
  institute_id: number;
  institute_full_name: string;
}

export interface Professor {
  professor_id: number;
  professor_fio: string;
}

export interface CreateSubjectApiResponse {
  course_name: string;
  address: string | null;
  institute_id: number | null;
  isConstantlyLink: boolean;
  professor_ids: number[];
}

export interface CreatePairApiResponse {
  startDateTime: string,
  endDateTime: string,
  address?: string,
  cabinet?: string,
  link?: string,
  name_lesson: string,
  course_id: number,
  full_time: boolean,
  institute_id?: number;
}
