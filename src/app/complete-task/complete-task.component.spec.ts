import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTaskComponent } from './complete-task.component';

describe('CompleteTaskComponent', () => {
  let component: CompleteTaskComponent;
  let fixture: ComponentFixture<CompleteTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompleteTaskComponent]
    });
    fixture = TestBed.createComponent(CompleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
