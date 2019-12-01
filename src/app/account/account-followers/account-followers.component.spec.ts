import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFollowersComponent } from './account-followers.component';
import { AccountCardComponent } from '../account-card/account-card.component';
import { FollowService, FollowMockService } from '../../shared/service/follow';

describe('AccountFollowersComponent', () => {
  let component: AccountFollowersComponent;
  let fixture: ComponentFixture<AccountFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        AccountFollowersComponent,
        AccountCardComponent
      ],
      providers: [
        { provide: FollowService, useClass: FollowMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
