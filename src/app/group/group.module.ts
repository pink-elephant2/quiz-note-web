import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'env/environment';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService, GroupMockService } from 'shared/service/group';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';

@NgModule({
  declarations: [
    GroupComponent,
    GroupListComponent,
    GroupFormComponent,
    GroupSearchComponent,
    GroupDetailComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ],
  providers: [
    environment.production ? GroupService : { provide: GroupService, useClass: GroupMockService }
  ]
})
export class GroupModule { }
