import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromtest from './../../state';
import * as testActions from './../../state/test.actions';
import { Test } from '../../test';

@Component({
  templateUrl: './test-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedtest$: Observable<Test>;
  tests$: Observable<Test[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromtest.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new testActions.Load());
    this.tests$ = this.store.pipe(select(fromtest.gettests));
    this.errorMessage$ = this.store.pipe(select(fromtest.getError));
    this.selectedtest$ = this.store.pipe(select(fromtest.getCurrenttest));
    this.displayCode$ = this.store.pipe(select(fromtest.getShowtestCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new testActions.ToggletestCode(value));
  }

  newtest(): void {
    this.store.dispatch(new testActions.InitializeCurrenttest());
  }

  testSelected(test: Test): void {
    this.store.dispatch(new testActions.SetCurrenttest(test));
  }

  deletetest(test: Test): void {
    this.store.dispatch(new testActions.Deletetest(test.id));
  }

  cleartest(): void {
    this.store.dispatch(new testActions.ClearCurrenttest());
  }
  savetest(test: Test): void {
    this.store.dispatch(new testActions.Createtest(test));
  }

  updatetest(test: Test): void {
    this.store.dispatch(new testActions.Updatetest(test));
  }
}
