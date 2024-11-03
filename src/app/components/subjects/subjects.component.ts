import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {
  searchTerm: string = '';

  rows = [
    { subject: 'Математика', address: 'Мира 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e3цйцйв цйв цйв цйв йцйв 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
    { subject: 'Информационные технологии', address: 'ул. Мира21212e321e21цй13 3121 32' },
    { subject: 'Инфцормационные технологии', address: 'ул. Мира21212e321e13 3121 32' },
  ];

  get filteredRows() {
    return this.rows.filter(row =>
      row.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
