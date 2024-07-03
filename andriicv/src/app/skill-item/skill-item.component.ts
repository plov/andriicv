import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.scss'
})
export class SkillItemComponent implements OnInit{

  @Input() skillValue: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}
