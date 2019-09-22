import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DBData } from './base-data';
import { MenuComponent } from './home/menu.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { ShellComponent } from './home/shell.component';
import { WelcomeComponent } from './home/welcome.component';
/* Feature Modules */
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    HttpClientInMemoryWebApiModule.forRoot(DBData),

    // StoreModule.forRoot({},
    //   {
    //     runtimeChecks: {
    //       strictStateImmutability: true,
    //       strictActionImmutability: true,
    //       strictStateSerializability: true,
    //       strictActionSerializability: true
    //     }
    //   }),
    StoreDevtoolsModule.instrument({
      name: 'APM Demo App DevTools',
      maxAge: 25
      //   logOnly: environment.testion
    }),
    EffectsModule.forRoot([])
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
