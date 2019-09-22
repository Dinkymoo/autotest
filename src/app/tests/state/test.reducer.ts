import { Test } from '../test';
import { testActionTypes, testActions } from './test.actions';

// State for this feature (test)
export interface TestState {
  showtestCode: boolean;
  currenttestId: number | null;
  tests: Test[];
  error: string;
}

const initialState: TestState = {
  showtestCode: true,
  currenttestId: null,
  tests: [],
  error: ''
};

export function reducer(state = initialState, action: testActions): TestState {
  switch (action.type) {
    case testActionTypes.ToggletestCode:
      return {
        ...state,
        showtestCode: action.payload
      };

    case testActionTypes.SetCurrenttest:
      return {
        ...state,
        currenttestId: action.payload.id
      };

    case testActionTypes.ClearCurrenttest:
      return {
        ...state,
        currenttestId: null
      };

    case testActionTypes.InitializeCurrenttest:
      return {
        ...state,
        currenttestId: 0
      };

    case testActionTypes.LoadSuccess:
      return {
        ...state,
        tests: action.payload,
        error: ''
      };

    case testActionTypes.LoadFail:
      return {
        ...state,
        tests: [],
        error: action.payload
      };

    case testActionTypes.UpdatetestSuccess:
      const updatedtests = state.tests.map(item =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        tests: updatedtests,
        currenttestId: action.payload.id,
        error: ''
      };

    case testActionTypes.UpdatetestFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currenttest is the new test.
    case testActionTypes.CreatetestSuccess:
      return {
        ...state,
        tests: [...state.tests, action.payload],
        currenttestId: action.payload.id,
        error: ''
      };

    case testActionTypes.CreatetestFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currenttest is null.
    case testActionTypes.DeletetestSuccess:
      return {
        ...state,
        tests: state.tests.filter(test => test.id !== action.payload),
        currenttestId: null,
        error: ''
      };

    case testActionTypes.DeletetestFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
