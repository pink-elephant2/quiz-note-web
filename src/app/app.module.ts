import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/service/auth';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/component/header';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';
import { QuizModule } from './quiz/quiz.module';
import { AccountModule } from './account/account.module';
import { LoadingModule } from './shared/component/loading';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    LoginModule,
    LogoutModule,
    SignupModule,
    QuizModule,
    AccountModule,
    LoadingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && location.hostname !== 'localhost' })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
