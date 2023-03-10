import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Store } from '@ngrx/store';
import * as fromAuthSelector from '../../../state/auth/auth.selector';
import * as fromAuthReducer from '../../../state/auth/auth.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];
  token$ = this.store.select(fromAuthSelector.selectToken);
  user$ = this.store.select(fromAuthSelector.selectUser);
  constructor(private store: Store<fromAuthReducer.State>) {}
  ngOnInit(): void {
    this.items = [];
  }
}
