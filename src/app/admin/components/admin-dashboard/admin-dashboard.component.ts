import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryI } from 'src/app/products/products/products.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  file!: File;
  imageUrl!: string;
  productForm!: FormGroup;
  submitted: boolean = false;
  categories: categoryI[] = [
    { id: 1, name: 'smartphones' },
    { id: 2, name: 'laptops' },
    { id: 3, name: 'fragrances' },
    { id: 4, name: 'skincare' },
    { id: 5, name: 'groceries' },
    { id: 6, name: 'furniture' },
    { id: 7, name: 'motorcycle' },
    { id: 8, name: 'tops' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.initForm();
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
    }
  }

  get fc() {
    return this.productForm.controls;
  }
}
