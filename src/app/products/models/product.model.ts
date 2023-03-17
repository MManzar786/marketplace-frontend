export interface ProductI {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: {
    id: number;
    name: string;
  };
  imageUrl: string[];
}

export interface ProductStateI {
  products: ProductI[];
  totalProductsCount: number;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}
