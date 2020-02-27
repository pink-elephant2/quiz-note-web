import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMemberMenuComponent } from './group-member-menu.component';

describe('GroupMemberMenuComponent', () => {
  let component: GroupMemberMenuComponent;
  let fixture: ComponentFixture<GroupMemberMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupMemberMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
