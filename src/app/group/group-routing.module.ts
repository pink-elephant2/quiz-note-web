import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupListComponent } from './group-list/group-list.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  { path: '', component: GroupListComponent, data: { title: 'グループ' } },
  { path: 'explore', component: GroupSearchComponent, data: { title: 'グループを探す' } },
  { path: 'create', component: GroupFormComponent, data: { title: 'グループ作成' } },
  { path: 'edit/:cd', component: GroupFormComponent, data: { title: 'グループ編集' } },
  { path: ':cd', component: GroupDetailComponent, data: { title: 'グループ詳細' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GroupRoutingModule { }
