import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StaticConf } from '../statcconf';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor() {
    this.config()
  }

  title = 'andriicv';
  logoPath = StaticConf.localPath + StaticConf.imagesPath + StaticConf.logoName;

  private config(): void {
    if (environment.production) {
      console.log("environment.production: " + environment.production)
      this.logoPath =  StaticConf.s3backetPath + StaticConf.imagesPath + StaticConf.logoName;
    }
  }
}
