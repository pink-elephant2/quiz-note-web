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
  { path: 'login', component: LoginComponent, data: { title: 'ログイン' } },
  { path: 'logout', component: LogoutComponent, data: { title: 'ログアウト' }, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, data: { title: '新規アカウント登録' } },
  { path: 'password', loadChildren: './password/password.module#PasswordModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactModule' },
  { path: 'quiz', component: QuizComponent, data: { title: 'クイズ一覧', infinityScroll: true }, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, data: { title: 'マイページ' }, canActivate: [AuthGuard] },
  // { path: 'group/:cd', loadChildren: () => import('./group/group.module').then(m => m.GroupModule) }
  { path: 'group/:cd', loadChildren: './group/group.module#GroupModule', canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: './setting/setting.module#SettingModule', canActivate: [AuthGuard] },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsModule' },
  { path: ':loginId', component: AccountComponent, data: { title: 'アカウント' }, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
