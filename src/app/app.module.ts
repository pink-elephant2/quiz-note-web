import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoginModule,
    LogoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
