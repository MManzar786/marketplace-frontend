import { ProductI } from 'src/app/products/models/product.model';

export interface CartStateI {
  cartItems: CartItemI[];
  cartItemsCount: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export interface CartItemI {
  id: number;
  product: ProductI;
  quantity: number;
}

export interface CartItemDeleteResponseI {
  success: boolean;
}

// CartItem DTO
export interface CartItemAddResponseI {
  cartItem: {
    id: number;
    cart: { id: number; user: UserI };
    productId: ProductI;
    quantity: number;
  };
}

// Cart DTO
export interface CartI {
  id: number;
  userId: number;
}

// User DTO
export interface UserI {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
