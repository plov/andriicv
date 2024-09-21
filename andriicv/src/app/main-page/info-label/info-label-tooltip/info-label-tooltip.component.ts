import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-label-tooltipl',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-label-tooltip.component.html',
  styleUrls: ['./info-label-tooltip.component.scss']
})
export class InfoLabelTooltipComponent {
  @Input() text: string = "";
}