import { App } from '../app';

/* NgRx */
import { Action } from '@ngrx/store';

export enum AppActionTypes {
  ToggleappCode = '[app] Toggle app Code',
  SetCurrentapp = '[app] Set Current app',
  ClearCurrentapp = '[app] Clear Current app',
  InitializeCurrentapp = '[app] Initialize Current app',
  Load = '[app] Load',
  LoadSuccess = '[app] Load Success',
  LoadFail = '[app] Load Fail',
  Updateapp = '[app] Update app',
  UpdateappSuccess = '[app] Update app Success',
  UpdateappFail = '[app] Update app Fail',
  Createapp = '[app] Create app',
  CreateappSuccess = '[app] Create app Success',
  CreateappFail = '[app] Create app Fail',
  Deleteapp = '[app] Delete app',
  DeleteappSuccess = '[app] Delete app Success',
  DeleteappFail = '[app] Delete app Fail'
}

// Action Creators
export class ToggleappCode implements Action {
  readonly type = AppActionTypes.ToggleappCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentapp implements Action {
  readonly type = AppActionTypes.SetCurrentapp;

  constructor(public payload: App) {}
}

export class ClearCurrentapp implements Action {
  readonly type = AppActionTypes.ClearCurrentapp;
}

export class InitializeCurrentapp implements Action {
  readonly type = AppActionTypes.InitializeCurrentapp;
}

export class Load implements Action {
  readonly type = AppActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = AppActionTypes.LoadSuccess;

  constructor(public payload: App[]) {}
}

export class LoadFail implements Action {
  readonly type = AppActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class Updateapp implements Action {
  readonly type = AppActionTypes.Updateapp;

  constructor(public payload: App) {}
}

export class UpdateappSuccess implements Action {
  readonly type = AppActionTypes.UpdateappSuccess;

  constructor(public payload: App) {}
}

export class UpdateappFail implements Action {
  readonly type = AppActionTypes.UpdateappFail;

  constructor(public payload: string) {}
}

export class Createapp implements Action {
  readonly type = AppActionTypes.Createapp;

  constructor(public payload: App) {}
}

export class CreateappSuccess implements Action {
  readonly type = AppActionTypes.CreateappSuccess;

  constructor(public payload: App) {}
}

export class CreateappFail implements Action {
  readonly type = AppActionTypes.CreateappFail;

  constructor(public payload: string) {}
}

export class Deleteapp implements Action {
  readonly type = AppActionTypes.Deleteapp;

  constructor(public payload: number) {}
}

export class DeleteappSuccess implements Action {
  readonly type = AppActionTypes.DeleteappSuccess;

  constructor(public payload: number) {}
}

export class DeleteappFail implements Action {
  readonly type = AppActionTypes.DeleteappFail;

  constructor(public payload: string) {}
}

// Union the valid types
export type appActions =
  | ToggleappCode
  | SetCurrentapp
  | ClearCurrentapp
  | InitializeCurrentapp
  | Load
  | LoadSuccess
  | LoadFail
  | Updateapp
  | UpdateappSuccess
  | UpdateappFail
  | Createapp
  | CreateappSuccess
  | CreateappFail
  | Deleteapp
  | DeleteappSuccess
  | DeleteappFail;
