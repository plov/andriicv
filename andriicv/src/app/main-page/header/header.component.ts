import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterModule, RouterOutlet } from '@angular/router';
import { StaticConf } from '../../staticconf';
import { Header } from '../../models/header-info/header';
import { HeaderProviderService } from '../../services/data-providers/header-provider.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(private headerService: HeaderProviderService) {
    this.config()
  }

  headerData: Header = new Header();

  title = 'andriicv';
  logoPath = StaticConf.localPath + StaticConf.imagesPath + StaticConf.logoName;
  summaryText = "";

  private config(): void {
    if (environment.production) {
      console.log("environment.production: " + environment.production)
      this.logoPath = StaticConf.s3backetPath + StaticConf.imagesPath + StaticConf.logoName;
    }
  }

  ngOnInit(): void {
    this.headerService.getHeaderData().subscribe(data => {
      this.headerData = data;
      this.summaryText = this.headerData.summaryText;
    });
  }
}
