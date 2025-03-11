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

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth() + 1;

  getPosition(): number{
    return this.convertToPx(this.item.monthStart, this.item.yearStart); 
  }

  getLength(): number{
    if(this.item.monthEnd == 0 && this.item.yearEnd == 0){
      return this.convertToPx(this.currentMonth, this.currentYear) - this.getPosition();
    }
    return this.convertToPx(this.item.monthEnd, this.item.yearEnd) - this.getPosition() -2;
  }

  convertToPx(month:number, year:number): number{
    return (((year - this.firstYear) * this.widthYearPx) + this.widthYearPx / 12 * month);
  }
}
