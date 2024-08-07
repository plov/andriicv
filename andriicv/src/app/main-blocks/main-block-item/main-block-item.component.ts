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
  position: string = "";
  location: string = "";
  icon: string = "";

  constructor(private router: Router, private MainBlockProvider: MainBlockProviderService, private sanitizer:DomSanitizer, private appStateService: AppStateService) { }

  ngOnInit(): void {

    this.id = this.experience.id;
    this.title = this.experience.blockName;
    this.time = this.experience.years;
    this.description = this.sanitizer.bypassSecurityTrustHtml(this.experience.shortDescription);
    this.position = this.experience.position;
    this.location = this.experience.location;
    this.icon = this.experience.icon;

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
