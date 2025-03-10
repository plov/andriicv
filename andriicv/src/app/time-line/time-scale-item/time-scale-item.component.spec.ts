import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeScaleItemComponent } from './time-scale-item.component';

describe('TimeScaleItemComponent', () => {
  let component: TimeScaleItemComponent;
  let fixture: ComponentFixture<TimeScaleItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeScaleItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeScaleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
