import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromtests from './test.reducer';

// Extends the app state to include the test feature.
// This is required because tests are lazy loaded.
// So the reference to testState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    tests: fromtests.TestState;
}

// Selector functions
const gettestFeatureState = createFeatureSelector<fromtests.TestState>('tests');

export const getShowtestCode = createSelector(
    gettestFeatureState,
    state => state.showtestCode
);

export const getCurrenttestId = createSelector(
    gettestFeatureState,
    state => state.currenttestId
);

export const getCurrenttest = createSelector(
    gettestFeatureState,
    getCurrenttestId,
    (state, currenttestId) => {
        if (currenttestId === 0) {
            return {
                id: 0,
                testName: '',
                testCode: 'New',
                description: '',
                starRating: 0
            };
        } else {
            return currenttestId ? state.tests.find(p => p.id === currenttestId) : null;
        }
    }
);

export const gettests = createSelector(
    gettestFeatureState,
    state => state.tests
);

export const getError = createSelector(
    gettestFeatureState,
    state => state.error
);
