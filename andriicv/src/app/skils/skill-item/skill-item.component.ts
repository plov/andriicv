import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsDescriptionComponent } from '../skills-description/skills-description.component';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule, SkillsDescriptionComponent],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.scss'
})
export class SkillItemComponent implements OnInit{

  @Input() skillValue: string = '';
  @Input() skillUsages: string = '';
  @Input() skillYears: number = 0;
  @Input() skillimage: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}
