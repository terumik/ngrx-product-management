import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.
    pipe(
      ofType(ProductActions.loadProducts), // if this action is dispatched...
      mergeMap(() => this.productService.getProducts().pipe( // map the observables
        map(products => ProductActions.loadProductsSuccess({ products })), // and dispatch another action with value
        catchError(err => of(ProductActions.loadProductsFail({ error: err })))
      )),
    );

  @Effect()
  createProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActions.createProduct),
      concatMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map(product => ProductActions.createProductSuccess({ product })),
          catchError(error => of(ProductActions.createProductFail({ error })))
        );
      })
    );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActions.updateProduct),
      concatMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map(product => ProductActions.updateProductSuccess({ product })),
          catchError(error => of(ProductActions.updateProductFail({ error })))
        );
      })
    );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductActions.deleteProduct),
      concatMap(action => {
        return this.productService.deleteProduct(action.productId).pipe(
          map(_ => ProductActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductActions.deleteProductFail({ error })))
        );
      })
    );

}

