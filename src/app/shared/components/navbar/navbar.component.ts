import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  ngOnInit(): void {
    this.items = [
      {
        label: 'Home',
        routerLink: '',
      },
      {
        label: 'Cart',
        routerLink: '/cart',
      },
      {
        label: 'Sign In',
        routerLink: '/auth/sign-in',
        styleClass: 'p-menuitem-right',
      },
    ];
  }
}
