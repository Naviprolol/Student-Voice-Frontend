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

export interface Pair {
  status: string;
  course_id: number;
  course_name: string;
  date_start: string; // или Date, если хочешь преобразовать
  date_end: string;   // или Date

  rating: number;
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
