import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from './app.actions';
import { AppService } from '../appservice';
import { App } from '../app';

@Injectable()
export class AppEffects {
  constructor(private appService: AppService, private actions$: Actions) {}

  @Effect()
  loadapps$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Load),
    mergeMap(action =>
      this.appService.getapps().pipe(
        map(apps => new appActions.LoadSuccess(apps)),
        catchError(err => of(new appActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateapp$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Updateapp),
    map((action: appActions.Updateapp) => action.payload),
    mergeMap((app: App) =>
      this.appService.updateapp(app).pipe(
        map(updatedapp => new appActions.UpdateappSuccess(updatedapp)),
        catchError(err => of(new appActions.UpdateappFail(err)))
      )
    )
  );

  @Effect()
  createapp$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Createapp),
    map((action: appActions.Createapp) => action.payload),
    mergeMap((app: App) =>
      this.appService.createapp(app).pipe(
        map(newapp => new appActions.CreateappSuccess(newapp)),
        catchError(err => of(new appActions.CreateappFail(err)))
      )
    )
  );

  @Effect()
  deleteapp$: Observable<Action> = this.actions$.pipe(
    ofType(appActions.AppActionTypes.Deleteapp),
    map((action: appActions.Deleteapp) => action.payload),
    mergeMap((appId: number) =>
      this.appService.deleteapp(appId).pipe(
        map(() => new appActions.DeleteappSuccess(appId)),
        catchError(err => of(new appActions.DeleteappFail(err)))
      )
    )
  );
}
