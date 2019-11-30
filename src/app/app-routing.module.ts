import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { QuizComponent } from './quiz/quiz.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'signup', component: SignupComponent, data: { title: 'ユーザー登録' } },
  { path: 'quiz', component: QuizComponent },
  // { path: 'account/:cd', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  // { path: 'group/:cd', loadChildren: () => import('./group/group.module').then(m => m.GroupModule) }
  { path: 'account/:cd', loadChildren: './account/account.module#AccountModule' },
  { path: 'group/:cd', loadChildren: './group/group.module#GroupModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
