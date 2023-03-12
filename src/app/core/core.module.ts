import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule],
  exports: [CommonModule, NavbarComponent],
})
export class CoreModule {}
