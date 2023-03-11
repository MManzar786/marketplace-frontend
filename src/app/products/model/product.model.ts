export interface ProductI {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductStateI {
  products: ProductI[];
  totalProductsCount: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
