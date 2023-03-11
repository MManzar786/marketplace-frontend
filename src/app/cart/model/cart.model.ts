import { ProductI } from 'src/app/products/model/product.model';

export interface CartStateI {
  cartItems: CartItemI[];
  cartItemsCount: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface CartItemI {
  item: ProductI;
  quantity: number;
}
