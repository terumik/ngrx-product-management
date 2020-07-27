import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductApiActions, ProductPageActions } from './actions';
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
      ofType(ProductPageActions.loadProducts), // if this action is dispatched...
      mergeMap(() => this.productService.getProducts().pipe( // map the observables
        map(products => ProductApiActions.loadProductsSuccess({ products })), // and dispatch another action with value
        catchError(err => of(ProductApiActions.loadProductsFail({ error: err })))
      )),
    );

  @Effect()
  createProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductPageActions.createProduct),
      concatMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map(product => ProductApiActions.createProductSuccess({ product })),
          catchError(error => of(ProductApiActions.createProductFail({ error })))
        );
      })
    );

  @Effect()
  updateProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map(product => ProductApiActions.updateProductSuccess({ product })),
          catchError(error => of(ProductApiActions.updateProductFail({ error })))
        );
      })
    );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$
    .pipe(
      ofType(ProductPageActions.deleteProduct),
      concatMap(action => {
        return this.productService.deleteProduct(action.productId).pipe(
          map(_ => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
          catchError(error => of(ProductApiActions.deleteProductFail({ error })))
        );
      })
    );

}

