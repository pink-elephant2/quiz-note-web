import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/service/auth';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { QuizComponent } from './quiz/quiz.component';
import { AccountComponent } from './account/account.component';
import { LpComponent } from './lp/lp.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: LoginComponent }, // PWA
  { path: 'login', component: LoginComponent, data: { title: 'ログイン' } },
  { path: 'logout', component: LogoutComponent, data: { title: 'ログアウト' }, canActivate: [AuthGuard] },
  { path: 'maintenance', loadChildren: () => import('./maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: 'signup', component: SignupComponent, data: { title: '新規アカウント登録' } },
  { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordModule) },
  { path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
  { path: 'quiz', component: QuizComponent, data: { title: 'クイズ一覧', infinityScroll: true }, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, data: { title: 'マイページ' }, canActivate: [AuthGuard] },
  { path: 'group', loadChildren: () => import('./group/group.module').then(m => m.GroupModule), canActivate: [AuthGuard] },
  { path: 'setting', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule), canActivate: [AuthGuard] },
  { path: 'privacy', loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule) },
  { path: 'terms', loadChildren: () => import('./terms/terms.module').then(m => m.TermsModule) },
  { path: 'lp', component: LpComponent },
  { path: ':loginId', component: AccountComponent, data: { title: 'アカウント' }, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
