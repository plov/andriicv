import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsDescriptionComponent } from '../skills-description/skills-description.component';
import { SkillTooltipComponent } from './tooltip/skill-tooltip.component';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule, SkillsDescriptionComponent, SkillTooltipComponent],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.scss'
})

export class SkillItemComponent implements OnInit {

  @Input() skillValue: string = '';
  @Input() skillUsages: string = '';
  @Input() skillYears: number = 0;
  @Input() skillImage: string = '';

  public showTooltip: boolean = false;
  private tooltipTimeout: any;
  private windowClickListener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

  }

  toggleTooltip() {
    console.log('toggleTooltip');
    this.showTooltip = !this.showTooltip;
    if (this.showTooltip) {
      this.startTooltipTimer();
      this.addFocusListeners();
    } else {
      this.clearTooltipTimer();
      this.removeFocusListeners();
    }
  }

  startTooltipTimer() {
    this.clearTooltipTimer();
    this.tooltipTimeout = setTimeout(() => {
      this.showTooltip = false;
      this.removeFocusListeners();
    }, 3000);
  }

  clearTooltipTimer() {
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }
  }

  addFocusListeners() {
    this.windowClickListener = this.renderer.listen('window', 'click', this.onWindowClick.bind(this));
  }

  removeFocusListeners() {
    if (this.windowClickListener) {
      this.windowClickListener();
    }
  }

  onWindowClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.showTooltip = false;
      this.clearTooltipTimer();
      this.removeFocusListeners();
    }
  }

  ngOnDestroy() {
    this.clearTooltipTimer();
    this.removeFocusListeners();
  }

}
