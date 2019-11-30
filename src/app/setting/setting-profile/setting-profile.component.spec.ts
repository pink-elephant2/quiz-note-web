import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SettingProfileComponent } from './setting-profile.component';
import { AuthService, AuthMockService } from 'src/app/shared/service/auth';
import { AccountService, AccountMockService } from 'src/app/shared/service/account';
import { LoadingService } from 'src/app/shared/service/loading';

describe('SettingProfileComponent', () => {
  let component: SettingProfileComponent;
  let fixture: ComponentFixture<SettingProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ],
      declarations: [SettingProfileComponent],
      providers: [
        { provide: AuthService, useClass: AuthMockService },
        { provide: AccountService, useClass: AccountMockService },
        LoadingService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
