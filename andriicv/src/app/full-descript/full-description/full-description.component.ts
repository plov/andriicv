import { Component, Input, OnInit} from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { CommonModule, LocationStrategy,} from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../main-page/header/header.component';
import { SkillsBlockComponent } from '../../skils/skills-block/skills-block.component';
import { StaticConf } from '../../staticconf';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { AppStateService } from '../../services/state-servises/app-state-service.service';
import { MainBlockProviderService } from '../../services/data-providers/main-block-provider.service';

@Component({
  selector: 'app-full-description',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    SkillsBlockComponent
  ],
  templateUrl: './full-description.component.html',
  styleUrl: './full-description.component.scss'
})
export class FullDescriptionComponent implements OnInit {

  mainBlockInfo: MainBlockModel = new MainBlockModel();

  title: string = "";
  time: string = "";
  description: SafeHtml = "";
  responsobility: SafeHtml = "";
  achievements: SafeHtml = "";
  lDescription: SafeHtml = "";
  position: string = "";
  location: string = "";
  icon: string = "";
  links: Array<string> = [];

  nameHide: boolean = false;
  yearsHide: boolean = false;
  positionHide: boolean = false;
  moreBtnHide: boolean = false;
  responsobilityHide: boolean = false;
  achievementsHide: boolean = false;
  shortDeskriptHide: boolean = false;
  locationHide: boolean = false;
  iconHide: boolean = false;
  linksHide: boolean = false;

  constructor(private router: Router,
    private MainBlockProvider: MainBlockProviderService,
    private sanitizer:DomSanitizer,
    private appStateService: AppStateService,
    private locationStrategy: LocationStrategy) {
      history.pushState(null, "", window.location.href);
      // check if back or forward button is pressed.
      this.locationStrategy.onPopState(() => {
        history.pushState(null, "", window.location.href);
        this.onBackBtnClick();
      });
  }

  ngOnInit(): void {
    let id = this.appStateService.getBlockId();
    if (id !== 0) {
      this.MainBlockProvider.getMainBlockById(id).subscribe(data => {
        this.mainBlockInfo = data;
        this.title = this.mainBlockInfo.blockName;
        this.time = this.mainBlockInfo.years;
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.shortDescription);
        this.responsobility = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.responsobility);
        this.achievements = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.achievements);
        this.lDescription = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.longDescription);
        this.position = this.mainBlockInfo.position;
        this.location = this.mainBlockInfo.location;
        this.icon = this.mainBlockInfo.icon;
        this.links = this.mainBlockInfo.links;

        this.nameHide = this.mainBlockInfo.nameHide;
        this.yearsHide = this.mainBlockInfo.yearsHide;
        this.positionHide = this.mainBlockInfo.positionHide;
        this.moreBtnHide = this.mainBlockInfo.longDescriptionHide;
        this.responsobilityHide = this.mainBlockInfo.responsobilityHide;
        this.achievementsHide = this.mainBlockInfo.achievementsHide;
        this.shortDeskriptHide = this.mainBlockInfo.shortDeskriptHide;
        this.locationHide = this.mainBlockInfo.locationHide;
        this.iconHide = this.mainBlockInfo.iconHide;
        this.linksHide = this.mainBlockInfo.linksHide;

        if (environment.production) {
          this.icon = StaticConf.s3backetPath + StaticConf.iconsPath + this.icon;
        } else {
          this.icon = StaticConf.localPath + StaticConf.iconsPath + this.icon;
        }
      });
    }
  }


  onBackBtnClick(): void {
    this.appStateService.setBlockId(0);
    this.appStateService.updateState();
    //this.router.navigate(['/']);
  }

}
