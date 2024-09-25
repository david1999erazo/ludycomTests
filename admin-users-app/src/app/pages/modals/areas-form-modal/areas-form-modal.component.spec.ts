import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasFormModalComponent } from './areas-form-modal.component';

describe('AreasFormModalComponent', () => {
  let component: AreasFormModalComponent;
  let fixture: ComponentFixture<AreasFormModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreasFormModalComponent]
    });
    fixture = TestBed.createComponent(AreasFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
