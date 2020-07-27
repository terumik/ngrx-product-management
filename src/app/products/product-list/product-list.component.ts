import { Component, OnInit, OnDestroy } from '@angular/core';

// import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getProducts, getError } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  // errorMessage: string;

  // displayCode: boolean;

  // products: Product[];

  // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(
    // private productService: ProductService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    // this.store.select(getShowProductCode).subscribe(
    //   val => { // products slice coming from reducer
    //     this.displayCode = val;
    //   }
    // );

    this.store.dispatch(ProductActions.loadProducts()); // load from the server
    this.products$ = this.store.select(getProducts); // load from local

    this.errorMessage$ = this.store.select(getError);
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    // .subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.displayCode$ =  this.store.select(getShowProductCode);
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({currentProductId: product.id}));
  }

}
