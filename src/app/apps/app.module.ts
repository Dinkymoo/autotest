import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AppListComponent } from './components/app-list/app-list.component';
import { AppEditComponent } from './components/app.edit/app-edit.component';
import { AppShellComponent } from './containers/app-shell/app-shell.component';
import { AppEffects } from './state/app.effects';
import { reducer } from './state/app.reducer';

const appRoutes: Routes = [{ path: '', component: AppShellComponent }];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes),
    StoreModule.forFeature('apps', reducer),
    EffectsModule.forFeature([AppEffects])
  ],
  declarations: [AppShellComponent, AppListComponent, AppEditComponent]
})
export class AppListModule {}
