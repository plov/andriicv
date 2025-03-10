import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scale-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scale-element.component.html',
  styleUrl: './scale-element.component.scss'
})
export class ScaleElementComponent {

  @Input() label: string = '';

}
