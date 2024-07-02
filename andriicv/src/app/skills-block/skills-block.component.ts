import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { DataProviderService } from '../data-provider/data-provider.service';

@Component({
  selector: 'app-skills-block',
  standalone: true,
  imports: [CommonModule, SkillItemComponent],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss'
})
export class SkillsBlockComponent implements OnInit {
  skills: string[] = [];

  constructor(private dataProviderService: DataProviderService) { }

  ngOnInit() {
   
    this.dataProviderService.getSkills().subscribe(data => {
      this.skills = data;
    });
  }

}
