import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItemI } from 'src/app/cart/model/cart.model';
import { OrderService } from 'src/app/core/services/order.service';
import * as cartSelector from 'src/app/state/cart/cart.selector';
import { USER_LABEL } from 'src/app/utils/constants';
import { OrderItemsI } from '../../model/checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems$!: Observable<CartItemI[]>;
  totalPrice: number = 0;
  form!: FormGroup;
  orderItems: OrderItemsI[] = [];
  constructor(private store: Store, private orderService: OrderService) {}
  ngOnInit(): void {
    this.cartItems$ = this.store.select(cartSelector.selectCartItems);
    this.form = new FormGroup({
      address: new FormControl('', [Validators.required]),
    });
    this.cartItems$.subscribe((cartItems) => {
      cartItems.forEach((cartItem) => {
        this.totalPrice += cartItem.product.price * cartItem.quantity;
        this.orderItems.push({
          productId: cartItem.product.id,
          quantity: cartItem.quantity,
        });
      });
    });
  }
  onSubmit() {
    if (this.form.valid) {
      let user = JSON.parse(localStorage.getItem(USER_LABEL) || '{}');
      if (Object.keys(user).length > 0) {
      }
      this.orderService
        .addAnOrder(user.id, this.orderItems)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
