import { Component, Input, OnInit } from '@angular/core';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SkillsBlockComponent } from '../../skills-block/skills-block.component';
import { DataProviderService } from '../../data-provider/data-provider.service';
import { StaticConf } from '../../staticconf';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

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
  lDescription: SafeHtml = "";
  position: string = "";
  location: string = "";
  icon: string = "";
  links: Array<string> = [];

  constructor(private router: Router, private dataProviderService: DataProviderService, private sanitizer:DomSanitizer) {

  }

  ngOnInit(): void {
    console.log("---FullDescriptionComponent");
    let id = this.dataProviderService.getBlockId();
    if (id !== 0) {
      this.dataProviderService.getMainBlockById(id).subscribe(data => {
        this.mainBlockInfo = data;
        this.title = this.mainBlockInfo.blockName;
        this.time = this.mainBlockInfo.years;
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.shortDescription);
        this.lDescription = this.sanitizer.bypassSecurityTrustHtml(this.mainBlockInfo.longDescription);
        this.position = this.mainBlockInfo.position;
        this.location = this.mainBlockInfo.location;
        this.icon = this.mainBlockInfo.icon;
        this.links = this.mainBlockInfo.links;

        if (environment.production) {
          console.log("environment.production: " + environment.production)
          this.icon = StaticConf.s3backetPath + StaticConf.iconsPath + this.icon;
        } else {
          this.icon = StaticConf.localPath + StaticConf.iconsPath + this.icon;
          console.log("icon path "+this.icon);
        }
      });
    }
  }

  onButtonClick(): void {
    this.dataProviderService.setBlockId(0);
    this.dataProviderService.updateState();
    //this.router.navigate(['/']);
  }

}
