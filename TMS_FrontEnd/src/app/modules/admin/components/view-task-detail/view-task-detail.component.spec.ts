import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskDetailComponent } from './view-task-detail.component';

describe('ViewTaskDetailComponent', () => {
  let component: ViewTaskDetailComponent;
  let fixture: ComponentFixture<ViewTaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTaskDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
