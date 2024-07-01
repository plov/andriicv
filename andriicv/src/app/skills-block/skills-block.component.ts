import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SkillItemComponent } from '../skill-item/skill-item.component';

@Component({
  selector: 'app-skills-block',
  standalone: true,
  imports: [CommonModule, SkillItemComponent],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss'
})
export class SkillsBlockComponent {

}
