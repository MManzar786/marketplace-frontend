import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, TableModule],
})
export class CartModule {}
