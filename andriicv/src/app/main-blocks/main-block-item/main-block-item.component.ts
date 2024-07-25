import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { Router } from '@angular/router';
import { DataProviderService } from '../../data-provider/data-provider.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { StaticConf } from '../../staticconf';

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

  constructor(private router: Router, private dataProviderService: DataProviderService, private sanitizer:DomSanitizer) { }

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
    
    this.dataProviderService.setBlockId(this.id);
    this.dataProviderService.updateState();
    //this.router.navigate(['/app-full-description']);
  }

}
