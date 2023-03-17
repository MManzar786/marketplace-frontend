import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductI } from '../../models/product.model';
import * as productsActions from 'src/app/state/products/product.action';
import * as productsSelector from 'src/app/state/products/product.selector';
import * as cartSelector from 'src/app/state/cart/cart.selector';
import { Observable } from 'rxjs';
import {
  LIMIT_DEFAULT,
  PAGE_NO_DEFAULT,
  PAGE_SIZE_DEFAULT,
  PAGE_SIZE_OPTION_DEFAULT,
  SKIP_DEFAULT,
} from 'src/app/utils/constants';
import { CategoryService } from 'src/app/core/services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  products$!: Observable<ProductI[]>;
  sortOptions!: any[];
  sortOrder!: number;
  totalCount!: number;
  pageSize: number = PAGE_SIZE_DEFAULT;
  pageNo: number = PAGE_NO_DEFAULT;
  pageSizeOptions: number[] = PAGE_SIZE_OPTION_DEFAULT;
  sortField!: string;
  categories: categoryI[] = [];
  selectedCategory: number = 0;
  searchValue: string = '';

  constructor(private store: Store, private categoryService: CategoryService) {}
  cartItems: any;
  ngOnInit(): void {
    this.getCategories();
    this.store.dispatch(
      productsActions.loadProducts({
        pageNo: PAGE_NO_DEFAULT,
        limit: LIMIT_DEFAULT,
      })
    );
    this.products$ = this.store.select(productsSelector.selectProducts);
    this.store
      .select(productsSelector.selectTotalCount)
      .subscribe((count: number) => {
        this.totalCount = count;
      });

    this.cartItems = this.store.select(cartSelector.selectCartItems);
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((categories: any) => {
      this.categories = categories['categories'];
    });
  }
  onPageChange($event: any) {
    if (this.searchValue !== '') {
      let pageNo = $event.page;
      this.pageSize = $event.rows;
      this.store.dispatch(
        productsActions.seacrhProductsRequest({
          skip: pageNo,
          limit: this.pageSize,
          searchString: this.searchValue,
        })
      );
    } else {
      let pageNo = $event.page;
      this.pageSize = $event.rows;
      this.store.dispatch(
        productsActions.loadProducts({
          pageNo: pageNo,
          limit: this.pageSize,
        })
      );
    }
  }

  onChangeCategory(value: categoryI) {
    this.selectedCategory = value.id;
    this.store.dispatch(
      productsActions.loadProductsByCategory({
        pageNo: 0,
        limit: this.pageSize,
        category: this.selectedCategory,
      })
    );
    this.searchValue = '';
  }
  onSearchClick() {
    this.searchValue = this.searchInput.nativeElement.value;
    this.store.dispatch(
      productsActions.seacrhProductsRequest({
        skip: 0,
        limit: LIMIT_DEFAULT,
        searchString: this.searchValue,
      })
    );
    this.pageNo = PAGE_NO_DEFAULT;
  }
}
export interface categoryI {
  id: number;
  name: string;
}
