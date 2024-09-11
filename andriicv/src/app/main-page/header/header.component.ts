import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaticConf } from '../../staticconf';
import { Header } from '../../models/header-info/header';
import { HeaderProviderService } from '../../services/data-providers/header-provider.service';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private api: ApiService;

  pin: string = "";

  constructor(private headerService: HeaderProviderService, private apiSersices: ApiService, public authService: AuthService) {
    this.config()
    this.api = apiSersices;
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

  onSubmitClick() {
    console.log("onSubmitClick: ", this.pin);
    this.api.getViwerByPin(this.pin).subscribe(data => {
      console.log("getViwerByPin: ", data); 
    });
  }
}
