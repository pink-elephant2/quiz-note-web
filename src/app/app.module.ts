import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './shared/service/auth';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/component/header';
import { FooterModule } from 'shared/component/footer/footer.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { SignupModule } from './signup/signup.module';
import { ContactModule } from './contact/contact.module';
import { QuizModule } from './quiz/quiz.module';
import { AccountModule } from './account/account.module';
import { LoadingModule } from './shared/component/loading';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LpComponent } from './lp/lp.component';
import { TwitterModule } from 'shared/component/twitter';
import { QuizCardModule } from 'shared/component/quiz-card';
import { ThemeColorModule } from 'shared/directive/theme-color';

@NgModule({
  declarations: [
    AppComponent,
    LpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    FooterModule,
    LoginModule,
    LogoutModule,
    SignupModule,
    ContactModule,
    QuizModule,
    QuizCardModule,
    AccountModule,
    LoadingModule,
    TwitterModule,
    ThemeColorModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production && location.hostname !== 'localhost' })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
