import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoLabelTooltipComponent } from './info-label-tooltip.component';

describe('InfoLabelTooltiplComponent', () => {
  let component: InfoLabelTooltipComponent;
  let fixture: ComponentFixture<InfoLabelTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLabelTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLabelTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
