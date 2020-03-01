import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from '../app-routing.module';
import { AccountComponent } from './account.component';
import { AccountPostComponent } from './account-post/account-post.component';
import { AccountFollowingComponent } from './account-following/account-following.component';
import { AccountFollowersComponent } from './account-followers/account-followers.component';
import { AccountCardComponent } from './account-card/account-card.component';
import { NavigateService } from '../shared/service/navigate';
import { AccountImageModule } from '../shared/directive/account-image';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AccountService, AccountMockService } from '../shared/service/account';
import { AuthService, AuthMockService } from '../shared/service/auth';
import { FollowService, FollowMockService } from '../shared/service/follow';
import { QuizService, QuizMockService } from '../shared/service/quiz';
import { QuizCardModule } from 'shared/component/quiz-card';
import { PaginationModule } from 'shared/component/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AccountImageModule,
    QuizCardModule,
    PaginationModule
  ],
  declarations: [
    AccountComponent,
    AccountPostComponent,
    AccountFollowingComponent,
    AccountFollowersComponent,
    AccountMenuComponent,
    AccountCardComponent
  ],
  exports: [AccountComponent],
  providers: [
    environment.production ? AccountService : { provide: AccountService, useClass: AccountMockService },
    environment.production ? AuthService : { provide: AuthService, useClass: AuthMockService },
    environment.production ? FollowService : { provide: FollowService, useClass: FollowMockService },
    environment.production ? QuizService : { provide: QuizService, useClass: QuizMockService },
    NavigateService
  ]
})
export class AccountModule { }
