import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFormModalComponent } from './users-form-modal.component';

describe('UsersFormModalComponent', () => {
  let component: UsersFormModalComponent;
  let fixture: ComponentFixture<UsersFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersFormModalComponent]
    });
    fixture = TestBed.createComponent(UsersFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
