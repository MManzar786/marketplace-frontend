import { ProductI } from 'src/app/products/models/product.model';

export interface CartStateI {
  cartItems: CartItemI[];
  cartItemsCount: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface CartItemI {
  product: ProductI;
  quantity: number;
}
