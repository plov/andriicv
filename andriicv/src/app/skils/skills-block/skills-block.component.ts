import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { SkillProviderService } from '../../services/data-providers/skill-provider.service';
import { SkillModel } from '../../models/skills/skill-model';
import { Subscription } from 'rxjs';
import { AppStateService } from '../../services/state-servises/app-state-service.service';
import { MainBlockProviderService } from '../../services/data-providers/main-block-provider.service';


@Component({
  selector: 'app-skills-block',
  standalone: true,
  imports: [CommonModule, SkillItemComponent],
  templateUrl: './skills-block.component.html',
  styleUrl: './skills-block.component.scss'
})
export class SkillsBlockComponent implements OnInit {
  skillsModel: SkillModel[] = [];
  skillModellRows: SkillModel[][] = [];

  private MainBlockProvider: MainBlockProviderService;
  private skillProvider: SkillProviderService;
  private subscription: Subscription = new Subscription();
  isMobile: boolean = false;

  constructor(private skillProviderService: SkillProviderService, private dataProviderService: MainBlockProviderService, private appStateService: AppStateService) {
    this.MainBlockProvider = dataProviderService;
    this.skillProvider = skillProviderService;
  }

  ngOnInit() {
    this.subscribeToData();
    this.isMobile = this.checkIfMobile();
  }

  checkIfMobile(): boolean {
    return window.matchMedia('(max-width: 768px)').matches;
  }

  chunkArray(array: SkillModel[], chunkSize: number): SkillModel[][] {
    const result: SkillModel[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    };
    return result;
  }

  private subscribeToData() {
    this.subscription.add(
      this.appStateService.componenState.subscribe(() => {
        const blockId = this.appStateService.getBlockId();
        if (blockId === 0) {
          this.skillProvider.getSkills().subscribe(data => {
            this.skillsModel = data;
            this.distributeSkills(this.skillsModel);
          });
        } else {
          this.dataProviderService.getMainBlockById(blockId).subscribe(data => {
            const mainBlockInfo = data;
            const skillsIds = mainBlockInfo.skillsIds;
            this.skillProvider.getSkillsByIds(skillsIds).subscribe(data => {
              this.skillsModel = data;
              this.distributeSkills(this.skillsModel);
            });
          });
        }
      })
    );
  }

  private distributeSkills(array: SkillModel[]) {
    this.skillModellRows = this.chunkArray(array, this.isMobile ? 4 : 8);
  }

  private unsubscribe() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

}
