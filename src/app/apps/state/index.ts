import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromapps from './app.reducer';

// Extends the app state to include the app feature.
// This is required because apps are lazy loaded.
// So the reference to appState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
  apps: fromapps.AppState;
}

// Selector functions
const getappFeatureState = createFeatureSelector<fromapps.AppState>('apps');

export const getShowappCode = createSelector(
  getappFeatureState,
  state => state.showappCode
);

export const getCurrentappId = createSelector(
  getappFeatureState,
  state => state.currentappId
);

export const getCurrentapp = createSelector(
  getappFeatureState,
  getCurrentappId,
  (state, currentappId) => {
    if (currentappId === 0) {
      return {
        id: 0,
        appName: '',
        appCode: 'New',
        description: '',
        starRating: 0
      };
    } else {
      return currentappId ? state.apps.find(p => p.id === currentappId) : null;
    }
  }
);

export const getapps = createSelector(
  getappFeatureState,
  state => state.apps
);

export const getError = createSelector(
  getappFeatureState,
  state => state.error
);
