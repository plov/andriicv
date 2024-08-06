import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { SkillProviderService } from '../../services/data-provider/skill-provider.service';
import { SkillModel } from '../../models/skills/skill-model';
import { Subscription } from 'rxjs';
import { StaticConf } from '../../staticconf';
import { AppStateService } from '../../services/state-servises/app-state-service.service';
import { MainBlockProviderService } from '../../services/data-provider/main-block-provider.service';


@Component({
  selector: 'app-skills-block',
  standalone: true,
  imports: [CommonModule, SkillItemComponent],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss'
})
export class SkillsBlockComponent implements OnInit {
  skillsModel: Array<SkillModel> = [];
  private MainBlockProvider: MainBlockProviderService;
  private skillProvider: SkillProviderService;
  private subscription: Subscription = new Subscription();

  constructor(private skillProviderService: SkillProviderService, private dataProviderService: MainBlockProviderService, private appStateService: AppStateService) { 
    this.MainBlockProvider = dataProviderService;
    this.skillProvider = skillProviderService;
  }

  ngOnInit() {
    this.subscribeToData();
  }

  private subscribeToData() {
    this.subscription.add(
      this.appStateService.componenState.subscribe(() => {
        const blockId = this.appStateService.getBlockId();
        if (blockId === 0) {
          this.skillProvider.getSkills().subscribe(data => {
            this.skillsModel = data;
          });
        } else {
          this.dataProviderService.getMainBlockById(blockId).subscribe(data => {
            const mainBlockInfo = data;
            const skillsIds = mainBlockInfo.skillsIds;
            this.skillProvider.getSkillsByIds(skillsIds).subscribe(data => {
              this.skillsModel = data;
            });
          });
        }
      })
    );
  }

  private unsubscribe() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
