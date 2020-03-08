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
import { GroupMemberMenuComponent } from './group-member-menu/group-member-menu.component';
import { GroupMenuComponent } from './group-menu/group-menu.component';
import { AccountImageModule } from 'shared/directive/account-image';
import { QuizCardModule } from 'shared/component/quiz-card';
import { PaginationModule } from 'shared/component/pagination';
import { ThemeColorModule } from 'shared/directive/theme-color';
import { ShareModalModule } from 'shared/component/share-modal';

@NgModule({
  declarations: [
    GroupComponent,
    GroupListComponent,
    GroupFormComponent,
    GroupSearchComponent,
    GroupDetailComponent,
    GroupPostComponent,
    GroupMemberComponent,
    GroupMemberMenuComponent,
    GroupMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GroupRoutingModule,
    GroupImageModule,
    AccountImageModule,
    QuizCardModule,
    PaginationModule,
    ThemeColorModule,
    ShareModalModule
  ],
  providers: [
    environment.production ? GroupService : { provide: GroupService, useClass: GroupMockService }
  ]
})
export class GroupModule { }
