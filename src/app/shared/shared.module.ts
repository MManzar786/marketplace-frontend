import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
// primeng Modules
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
