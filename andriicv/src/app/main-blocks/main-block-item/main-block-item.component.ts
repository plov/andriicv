import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { StaticConf } from '../../staticconf';
import { AppStateService } from '../../services/state-servises/app-state-service.service';
import { MainBlockProviderService } from '../../services/data-providers/main-block-provider.service';

@Component({
  selector: 'app-main-block-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-block-item.component.html',
  styleUrl: './main-block-item.component.scss'
})

export class MainBlockItemComponent implements OnInit {

  @Input() experience: MainBlockModel = new MainBlockModel();

  private id: number = 0;
  title: string = "";
  time: string = "";
  description: SafeHtml = "";
  responsobility: SafeHtml = "";
  achievements: SafeHtml = "";
  position: string = "";
  location: string = "";
  icon: string = "";

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

  constructor(private router: Router, private MainBlockProvider: MainBlockProviderService, private sanitizer:DomSanitizer, private appStateService: AppStateService) { }

  ngOnInit(): void {

    this.id = this.experience.id;
    this.title = this.experience.blockName;
    this.time = this.experience.years;
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.experience.shortDescription);
    this.responsobility = this.sanitizer.bypassSecurityTrustHtml(this.experience.responsobility);
    this.achievements = this.sanitizer.bypassSecurityTrustHtml(this.experience.achievements);
    this.position = this.experience.position;
    this.location = this.experience.location;
    this.icon = this.experience.icon;

    this.nameHide = this.experience.nameHide;
    this.yearsHide = this.experience.yearsHide;
    this.positionHide = this.experience.positionHide;
    this.moreBtnHide = this.experience.longDescriptionHide;
    this.responsobilityHide = this.experience.responsobilityHide;
    this.achievementsHide = this.experience.achievementsHide;
    this.shortDeskriptHide = this.experience.shortDeskriptHide;
    this.locationHide = this.experience.locationHide;
    this.iconHide = this.experience.iconHide;
    this.linksHide = this.experience.linksHide;

    if (environment.production) {
      console.log("environment.production: " + environment.production)
      this.icon = StaticConf.s3backetPath + StaticConf.iconsPath + this.icon;
    } else {
      this.icon = StaticConf.localPath + StaticConf.iconsPath + this.icon;
    }

  }

  onButtonClick(): void {
    
    this.appStateService.setBlockId(this.id);
    this.appStateService.updateState();
    //this.router.navigate(['/app-full-description']);
  }

}
