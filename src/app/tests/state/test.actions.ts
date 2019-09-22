import { Test } from '../test';

/* NgRx */
import { Action } from '@ngrx/store';

export enum testActionTypes {
  ToggletestCode = '[test] Toggle test Code',
  SetCurrenttest = '[test] Set Current test',
  ClearCurrenttest = '[test] Clear Current test',
  InitializeCurrenttest = '[test] Initialize Current test',
  Load = '[test] Load',
  LoadSuccess = '[test] Load Success',
  LoadFail = '[test] Load Fail',
  Updatetest = '[test] Update test',
  UpdatetestSuccess = '[test] Update test Success',
  UpdatetestFail = '[test] Update test Fail',
  Createtest = '[test] Create test',
  CreatetestSuccess = '[test] Create test Success',
  CreatetestFail = '[test] Create test Fail',
  Deletetest = '[test] Delete test',
  DeletetestSuccess = '[test] Delete test Success',
  DeletetestFail = '[test] Delete test Fail'
}

// Action Creators
export class ToggletestCode implements Action {
  readonly type = testActionTypes.ToggletestCode;

  constructor(public payload: boolean) { }
}

export class SetCurrenttest implements Action {
  readonly type = testActionTypes.SetCurrenttest;

  constructor(public payload: Test) { }
}

export class ClearCurrenttest implements Action {
  readonly type = testActionTypes.ClearCurrenttest;
}

export class InitializeCurrenttest implements Action {
  readonly type = testActionTypes.InitializeCurrenttest;
}

export class Load implements Action {
  readonly type = testActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = testActionTypes.LoadSuccess;

  constructor(public payload: Test[]) { }
}

export class LoadFail implements Action {
  readonly type = testActionTypes.LoadFail;

  constructor(public payload: string) { }
}

export class Updatetest implements Action {
  readonly type = testActionTypes.Updatetest;

  constructor(public payload: Test) { }
}

export class UpdatetestSuccess implements Action {
  readonly type = testActionTypes.UpdatetestSuccess;

  constructor(public payload: Test) { }
}

export class UpdatetestFail implements Action {
  readonly type = testActionTypes.UpdatetestFail;

  constructor(public payload: string) { }
}

export class Createtest implements Action {
  readonly type = testActionTypes.Createtest;

  constructor(public payload: Test) { }
}

export class CreatetestSuccess implements Action {
  readonly type = testActionTypes.CreatetestSuccess;

  constructor(public payload: Test) { }
}

export class CreatetestFail implements Action {
  readonly type = testActionTypes.CreatetestFail;

  constructor(public payload: string) { }
}

export class Deletetest implements Action {
  readonly type = testActionTypes.Deletetest;

  constructor(public payload: number) { }
}

export class DeletetestSuccess implements Action {
  readonly type = testActionTypes.DeletetestSuccess;

  constructor(public payload: number) { }
}

export class DeletetestFail implements Action {
  readonly type = testActionTypes.DeletetestFail;

  constructor(public payload: string) { }
}

// Union the valid types
export type testActions = ToggletestCode
  | SetCurrenttest
  | ClearCurrenttest
  | InitializeCurrenttest
  | Load
  | LoadSuccess
  | LoadFail
  | Updatetest
  | UpdatetestSuccess
  | UpdatetestFail
  | Createtest
  | CreatetestSuccess
  | CreatetestFail
  | Deletetest
  | DeletetestSuccess
  | DeletetestFail;

