import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { environment } from 'env/environment';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService, GroupMockService } from 'shared/service/group';

@NgModule({
  declarations: [
    GroupComponent,
    GroupListComponent
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
