import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { OrderService } from 'src/app/core/services/order.service';
import { ProductService } from 'src/app/core/services/product.service';
import { categoryI } from 'src/app/products/components/products/products.component';
import { OrderI } from '../../model/order.model';
export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  orders: OrderI[] = [];
  file!: File;
  imageUrl!: string;
  productForm!: FormGroup;
  submitted: boolean = false;
  categories: categoryI[] = [];
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.initForm();
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.orderService.getAllOrders().subscribe((res: any) => {
      this.orders = res['orders'];
    });
  }
  getCategories() {
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories['categories'];
    });
  }

  initForm(): void {
    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(1)]),
      category: new FormControl('', Validators.required),
    });
  }
  getImage($event: Event) {
    const file = ($event.target as any).files[0];
    this.file = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  validateInput(inputField: string) {
    if (this.fc[inputField].hasError('required')) {
      this.fc[inputField].setErrors({
        error: `${
          inputField.split('')[0].toUpperCase() +
          inputField.split('').slice(1).join('')
        } is Required `,
      });
    } else if (this.fc[inputField].hasError('min')) {
      this.fc[inputField].setErrors({
        error: `${
          inputField.split('')[0].toUpperCase() +
          inputField.split('').slice(1).join('')
        } must be greater than zero`,
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.valid) {
      let formData = new FormData();
      formData.append('title', this.fc['title'].value);
      formData.append('description', this.fc['description'].value);
      formData.append('category', this.fc['category'].value);
      formData.append('price', this.fc['price'].value);
      formData.append('image', this.file);
      this.productService.addProducts(formData).subscribe((res) => {
        console.log(res);
      });
    }
  }

  get fc() {
    return this.productForm.controls;
  }
}
