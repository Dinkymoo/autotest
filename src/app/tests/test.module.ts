import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { testEditComponent } from './components/test-edit/test-edit.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestShellComponent } from './containers/test-shell/test-shell.component';
import { testEffects } from './state/test.effects';
import { reducer } from './state/test.reducer';

const testRoutes: Routes = [{ path: '', component: TestShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(testRoutes),
    StoreModule.forFeature('tests', reducer),
    EffectsModule.forFeature([testEffects])
  ],
  declarations: [TestShellComponent, TestListComponent, testEditComponent]
})
export class TestModule {}
