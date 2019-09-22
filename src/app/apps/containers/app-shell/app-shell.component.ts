import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromapp from './../../state';
import * as appActions from './../../state/app.actions';
import { App } from '../../app';

@Component({
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent implements OnInit {
  displayCode$: Observable<boolean>;
  selectedapp$: Observable<App>;
  apps$: Observable<App[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromapp.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new appActions.Load());
    this.apps$ = this.store.pipe(select(fromapp.getapps));
    this.errorMessage$ = this.store.pipe(select(fromapp.getError));
    this.selectedapp$ = this.store.pipe(select(fromapp.getCurrentapp));
    this.displayCode$ = this.store.pipe(select(fromapp.getShowappCode));
  }

  checkChanged(value: boolean): void {
    this.store.dispatch(new appActions.ToggleappCode(value));
  }

  newapp(): void {
    this.store.dispatch(new appActions.InitializeCurrentapp());
  }

  appSelected(app: App): void {
    this.store.dispatch(new appActions.SetCurrentapp(app));
  }

  deleteapp(app: App): void {
    this.store.dispatch(new appActions.Deleteapp(app.id));
  }

  clearapp(): void {
    this.store.dispatch(new appActions.ClearCurrentapp());
  }
  saveapp(app: App): void {
    this.store.dispatch(new appActions.Createapp(app));
  }

  updateapp(app: App): void {
    this.store.dispatch(new appActions.Updateapp(app));
  }
}
