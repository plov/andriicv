import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills-description.component.html',
  styleUrl: './skills-description.component.scss'
})
export class SkillsDescriptionComponent {
    @Input() title: string = '';
    isVisible: boolean = false;
  
    constructor() { }
  
    open() {
      this.isVisible = true;
    }
  
    close() {
      this.isVisible = false;
    }
  }
