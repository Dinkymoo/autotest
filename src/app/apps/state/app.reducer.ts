import { App } from '../app';
import { appActions, AppActionTypes } from './app.actions';

// State for this feature (app)
export interface AppState {
  showappCode: boolean;
  currentappId: number | null;
  apps: App[];
  error: string;
}

const initialState: AppState = {
  showappCode: true,
  currentappId: null,
  apps: [],
  error: ''
};

export function reducer(state = initialState, action: appActions): AppState {
  switch (action.type) {
    case AppActionTypes.ToggleappCode:
      return {
        ...state,
        showappCode: action.payload
      };

    case AppActionTypes.SetCurrentapp:
      return {
        ...state,
        currentappId: action.payload.id
      };

    case AppActionTypes.ClearCurrentapp:
      return {
        ...state,
        currentappId: null
      };

    case AppActionTypes.InitializeCurrentapp:
      return {
        ...state,
        currentappId: 0
      };

    case AppActionTypes.LoadSuccess:
      return {
        ...state,
        apps: action.payload,
        error: ''
      };

    case AppActionTypes.LoadFail:
      return {
        ...state,
        apps: [],
        error: action.payload
      };

    case AppActionTypes.UpdateappSuccess:
      const updatedapps = state.apps.map(item =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        apps: updatedapps,
        currentappId: action.payload.id,
        error: ''
      };

    case AppActionTypes.UpdateappFail:
      return {
        ...state,
        error: action.payload
      };

    // After a create, the currentapp is the new app.
    case AppActionTypes.CreateappSuccess:
      return {
        ...state,
        apps: [...state.apps, action.payload],
        currentappId: action.payload.id,
        error: ''
      };

    case AppActionTypes.CreateappFail:
      return {
        ...state,
        error: action.payload
      };

    // After a delete, the currentapp is null.
    case AppActionTypes.DeleteappSuccess:
      return {
        ...state,
        apps: state.apps.filter(app => app.id !== action.payload),
        currentappId: null,
        error: ''
      };

    case AppActionTypes.DeleteappFail:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}
