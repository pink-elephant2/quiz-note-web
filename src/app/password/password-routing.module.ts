import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password.component';
import { PasswordReminderComponent } from './password-reminder/password-reminder.component';


const routes: Routes = [
  {
    path: '', component: PasswordComponent,
    children: [
      { path: 'reminder', component: PasswordReminderComponent, data: { title: 'パスワードリマインダー' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
