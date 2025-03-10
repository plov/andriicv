import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaleElementComponent } from './scale-element.component';

describe('ScaleElementComponent', () => {
  let component: ScaleElementComponent;
  let fixture: ComponentFixture<ScaleElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScaleElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScaleElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
