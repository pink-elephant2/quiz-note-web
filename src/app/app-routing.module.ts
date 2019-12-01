import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/service/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { QuizComponent } from './quiz/quiz.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, data: { title: 'ユーザー登録' } },
  { path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, data: { title: 'マイページ' }, canActivate: [AuthGuard] },
  // { path: 'group/:cd', loadChildren: () => import('./group/group.module').then(m => m.GroupModule) }
  { path: 'group/:cd', loadChildren: './group/group.module#GroupModule', canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: './setting/setting.module#SettingModule', canActivate: [AuthGuard] },
  { path: ':loginId', component: AccountComponent, data: { title: 'アカウント' }, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
