import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountComponent } from './account.component';
import { AccountImageModule } from '../shared/directive/account-image';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccountPostComponent } from './account-post/account-post.component';
import { AccountFollowingComponent } from './account-following/account-following.component';
import { AccountFollowersComponent } from './account-followers/account-followers.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { AccountService, AccountMockService } from '../shared/service/account';
import { AuthService, AuthMockService } from '../shared/service/auth';
import { FollowService, FollowMockService } from '../shared/service/follow';
import { NavigateService } from '../shared/service/navigate';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AccountImageModule
      ],
      declarations: [
        AccountComponent,
        AccountCardComponent,
        AccountPostComponent,
        AccountFollowingComponent,
        AccountFollowersComponent,
        AccountMenuComponent
      ],
      providers: [
        { provide: AccountService, useClass: AccountMockService },
        { provide: AuthService, useClass: AuthMockService },
        { provide: FollowService, useClass: FollowMockService },
        NavigateService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
