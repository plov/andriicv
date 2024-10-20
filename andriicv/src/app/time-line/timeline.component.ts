import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline.',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent {
  years: number[] = [];

  constructor() {
    for (let year = 2000; year <= 2025; year++) {
      this.years.push(year);
    }
  }
}
