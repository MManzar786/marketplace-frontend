import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { catchError, Observable, of, tap } from 'rxjs';
import { CartItemI } from 'src/app/cart/model/cart.model';
import { OrderService } from 'src/app/core/services/order.service';
import * as cartSelector from 'src/app/state/cart/cart.selector';
import { USER_LABEL } from 'src/app/utils/constants';
import { OrderItemsI } from '../../model/checkout.model';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    private store: Store,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}
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
    if (this.form.valid && this.totalPrice > 0) {
      let user = JSON.parse(localStorage.getItem(USER_LABEL) || '{}');
      if (Object.keys(user).length > 0) {
      }
      this.orderService
        .addAnOrder(user.id, this.orderItems)
        .pipe(
          tap(() => {
            this.toastr.success('Order placed successfully');
          }),
          catchError((error) => {
            this.toastr.error('Error placing order');
            return of(error);
          })
        )
        .subscribe((res) => {});
    } else {
      this.totalPrice == 0
        ? this.toastr.warning('No Items Found')
        : this.toastr.warning('Please enter address');
    }
  }
}
