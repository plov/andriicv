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
    const blockId = this.dataProviderService.getBlockId();
    if (blockId === 0) {
      this.dataProviderService.getSkills().subscribe(data => {
        this.skillsModel = data;
      });
    } else {
      this.dataProviderService.getMainBlockById(blockId).subscribe(data => {
        const mainBlockInfo = data;
        const skillsIds = mainBlockInfo.skillsIds;
        this.dataProviderService.getSkillsByIds(skillsIds).subscribe(data => {
          this.skillsModel = data;
        });
      });
    }
  }
}
