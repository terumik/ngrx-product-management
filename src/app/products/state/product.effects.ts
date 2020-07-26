import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';

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
        catchError(err => of(ProductActions.loadProductsFail({error: err})))
      )),
    );
}

