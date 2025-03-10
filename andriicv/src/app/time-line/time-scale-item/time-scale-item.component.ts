import { CommonModule } from '@angular/common';
import { Component , Input} from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';

@Component({
  selector: 'app-time-scale-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-scale-item.component.html',
  styleUrl: './time-scale-item.component.scss'
})
export class TimeScaleItemComponent {
  @Input() item: MainBlockModel = new MainBlockModel();

  firstYear: number = 2000;
  widthPx: number = 20;
  widthYearPx: number = 4 * this.widthPx;

  getPosition(): number{
    return this.convertToPx(this.item.monthStart, this.item.yearStart); 
  }

  convertToPx(month:number, year:number): number{
    return (((year - this.firstYear) * this.widthYearPx) + this.widthYearPx / month);
  }
}
