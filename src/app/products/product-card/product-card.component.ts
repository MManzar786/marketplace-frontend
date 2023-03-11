import { Component, Input } from '@angular/core';
import { ProductI } from '../model/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: ProductI;
  constructor() {}
}
