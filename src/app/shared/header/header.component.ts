import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    // trigger('slideInOut', [
    //   state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
    //   transition(':enter', [
    //     animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    //   ]),
    //   transition(':leave', [
    //     animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
    //   ])
    // ]),
    trigger('dropdownAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-10px)' })),
      transition(':enter', [
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ]),
    // trigger('iconAnimation', [
    //   state('closed', style({ transform: 'rotate(0deg)' })),
    //   state('open', style({ transform: 'rotate(180deg)' })),
    //   transition('closed <=> open', animate('300ms ease-in-out'))
    // ])
  ]
})

export class HeaderComponent implements OnInit {

  isDropdownOpen = false;
  isNavOpen = false;
  userName: string | null = null;

  constructor(private auth: AuthService, private otherService: OtherService, private router: Router) { }

  ngOnInit(): void {
    this.otherService.getUserInfo().subscribe((user) => {
      this.userName = user.fio
    })
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.otherService.clearCache(); // Очищаем кэш при выходе
  }
}
