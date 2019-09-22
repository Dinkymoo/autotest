import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { TestService } from '../test.service';
import { Test } from '../test';

/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as testActions from './test.actions';

@Injectable()
export class testEffects {

  constructor(private testService: TestService,
              private actions$: Actions) { }

  @Effect()
  loadtests$: Observable<Action> = this.actions$.pipe(
    ofType(testActions.testActionTypes.Load),
    mergeMap(action =>
      this.testService.gettests().pipe(
        map(tests => (new testActions.LoadSuccess(tests))),
        catchError(err => of(new testActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updatetest$: Observable<Action> = this.actions$.pipe(
    ofType(testActions.testActionTypes.Updatetest),
    map((action: testActions.Updatetest) => action.payload),
    mergeMap((test: Test) =>
      this.testService.updatetest(test).pipe(
        map(updatedtest => (new testActions.UpdatetestSuccess(updatedtest))),
        catchError(err => of(new testActions.UpdatetestFail(err)))
      )
    )
  );

  @Effect()
  createtest$: Observable<Action> = this.actions$.pipe(
    ofType(testActions.testActionTypes.Createtest),
    map((action: testActions.Createtest) => action.payload),
    mergeMap((test: Test) =>
      this.testService.createtest(test).pipe(
        map(newtest => (new testActions.CreatetestSuccess(newtest))),
        catchError(err => of(new testActions.CreatetestFail(err)))
      )
    )
  );

  @Effect()
  deletetest$: Observable<Action> = this.actions$.pipe(
    ofType(testActions.testActionTypes.Deletetest),
    map((action: testActions.Deletetest) => action.payload),
    mergeMap((testId: number) =>
      this.testService.deletetest(testId).pipe(
        map(() => (new testActions.DeletetestSuccess(testId))),
        catchError(err => of(new testActions.DeletetestFail(err)))
      )
    )
  );
}
