import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CheckoutComponent],
  imports: [CommonModule, CheckoutRoutingModule, ReactiveFormsModule],
})
export class CheckoutModule {}
