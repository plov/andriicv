import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScaleElementComponent } from './scale-element/scale-element.component';
import { TimeScaleItemComponent } from './time-scale-item/time-scale-item.component';
import { MainBlockModel } from '../models/main-block/main-block-model';
import { MainBlockProviderService } from '../services/data-providers/main-block-provider.service';

@Component({
  selector: 'app-timeline.',
  standalone: true,
  imports: [CommonModule, ScaleElementComponent, TimeScaleItemComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class TimelineComponent {
  years: string[] = [];

  @ViewChild('timeline') timeline!: ElementRef;

  timeScaleItems: Array<MainBlockModel> = [];

  constructor(private mainBlockProvider: MainBlockProviderService) {

    this.mainBlockProvider.getMainBlocksInfo().subscribe(data => {
      this.timeScaleItems = data;
    });

    for (let year = 2000; year <= 2025; year++) {
      this.years.push(year.toString());
    }
  }
}
