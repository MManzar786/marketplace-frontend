import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductI } from '../model/product.model';
import * as productsActions from 'src/app/state/products/product.action';
import * as productsSelector from 'src/app/state/products/product.selector';
import { Observable } from 'rxjs';
import {
  LIMIT_DEFAULT,
  PAGE_NO_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTION_DEFAULT,
  SKIP_DEFAULT,
} from 'src/app/utils/constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  sortOptions!: any[];
  sortOrder!: number;
  totalCount!: number;
  pageSize: number = PAGE_SIZE_DEFAULT;
  pageNo: number = PAGE_NO_DEFAULT;
  pageSizeOptions: number[] = PAGE_SIZE_OPTION_DEFAULT;
  sortField!: string;
  products$!: Observable<ProductI[]>;
  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;
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
  selectedCategory: string = '';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      productsActions.loadProducts({ skip: SKIP_DEFAULT, limit: LIMIT_DEFAULT })
    );
    this.products$ = this.store.select(productsSelector.selectProducts);
    this.store
      .select(productsSelector.selectTotalCount)
      .subscribe((count: number) => {
        this.totalCount = count;
      });
  }

  onPageChange($event: any) {
    let pageNo = $event.page;
    this.pageSize = $event.rows;
    this.store.dispatch(
      productsActions.loadProducts({
        skip: pageNo * this.pageSize,
        limit: this.pageSize,
      })
    );
  }

  onChangeCategory(value: categoryI) {
    this.selectedCategory = value.name;
    this.store.dispatch(
      productsActions.loadProducts({
        skip: 0,
        limit: this.pageSize,
        category: this.selectedCategory,
      })
    );
  }

  onSearchClick() {
    const searchValue = this.searchInput.nativeElement.value;
    this.store.dispatch(
      productsActions.seacrhProductsRequest({
        skip: 0,
        limit: LIMIT_DEFAULT,
        searchString: searchValue,
        selectedCategory: this.selectedCategory,
      })
    );
  }
}
export interface categoryI {
  id: number;
  name: string;
}
