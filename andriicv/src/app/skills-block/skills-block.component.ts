import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { DataProviderService } from '../data-provider/data-provider.service';
import { SkillModel } from '../models/skills/skill-model';

@Component({
  selector: 'app-skills-block',
  standalone: true,
  imports: [CommonModule, SkillItemComponent],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss'
})
export class SkillsBlockComponent implements OnInit {
  skillsModel: Array<SkillModel> = [];

  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() {
   
    this.dataProviderService.getSkills().subscribe(data => {
      this.skillsModel = data;
    });
  }
}
