import { OrderItemsI } from 'src/app/checkout/model/checkout.model';

export interface OrderI {
  id: number;
  status: string;
  createdAt: string;
  items: OrderItemsI[];
}
