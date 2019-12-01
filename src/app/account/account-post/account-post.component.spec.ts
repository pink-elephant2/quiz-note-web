import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AccountPostComponent } from './account-post.component';
import { QuizService, QuizMockService } from '../../shared/service/quiz';

describe('AccountPostComponent', () => {
  let component: AccountPostComponent;
  let fixture: ComponentFixture<AccountPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      declarations: [AccountPostComponent],
      providers: [
        { provide: QuizService, useClass: QuizMockService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
