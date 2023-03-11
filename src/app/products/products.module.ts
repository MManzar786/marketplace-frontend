import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products/products.component';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from './product-card/product-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    CarouselModule,
    PaginatorModule,
    ButtonModule,
    DataViewModule,
    RatingModule,
  ],
})
export class ProductsModule {}
