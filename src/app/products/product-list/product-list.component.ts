import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  // note: tells angular that this component is solely depends on @Input, brings better application performance
  // async, promise WILL NOT trigger change detection (component update)
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() displayCode: boolean;
  @Input() products: Product[];
  @Input() selectedProduct: Product;

  @Output() displayCodeChanged = new EventEmitter<boolean>();
  @Output() initNewProduct = new EventEmitter<void>();
  @Output() productWasSelected = new EventEmitter<Product>();

  checkChanged1() {
    this.displayCodeChanged.emit();
  }

  newProduct1() {
    this.initNewProduct.emit();
  }

  productSelected1(product: Product) {
    this.productWasSelected.emit(product);
  }
}
