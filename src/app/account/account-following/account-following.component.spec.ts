import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AccountFollowingComponent } from './account-following.component';
import { AccountCardComponent } from '../account-card/account-card.component';
import { FollowService, FollowMockService } from '../../shared/service/follow';

describe('AccountFollowingComponent', () => {
  let component: AccountFollowingComponent;
  let fixture: ComponentFixture<AccountFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      declarations: [
        AccountFollowingComponent,
        AccountCardComponent
      ],
      providers: [
        { provide: FollowService, useClass: FollowMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
