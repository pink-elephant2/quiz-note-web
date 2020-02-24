import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { environment } from 'env/environment';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService, GroupMockService } from 'shared/service/group';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupImageModule } from 'shared/directive/group-image';
import { GroupPostComponent } from './group-post/group-post.component';
import { GroupMemberComponent } from './group-member/group-member.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';

@NgModule({
  declarations: [
    GroupComponent,
    GroupListComponent,
    GroupFormComponent,
    GroupSearchComponent,
    GroupDetailComponent,
    GroupPostComponent,
    GroupMemberComponent,
    GroupMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GroupRoutingModule,
    GroupImageModule
  ],
  providers: [
    environment.production ? GroupService : { provide: GroupService, useClass: GroupMockService }
  ]
})
export class GroupModule { }
