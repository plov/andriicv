import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StaticConf } from '../../staticconf';
import { Header } from '../../models/header-info/header';
import { HeaderProviderService } from '../../services/data-providers/header-provider.service';
import { ApiService } from '../../services/api/api.service';
import { AuthService } from '../../services/auth/auth.service';
import { Link } from '../../models/header-info/link';
import { LoginformComponent } from '../../loginform/loginform.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, LoginformComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  @ViewChild('loginFormModal') loginFormModal!: LoginformComponent;
  pin: string = "";

  constructor(
    private headerService: HeaderProviderService,
    private api: ApiService,
    public authService: AuthService,
    private router: Router) {
    this.config()
  }

  headerData: Header = new Header();
  title = 'andriicv';
  logoPath = StaticConf.localPath + StaticConf.imagesPath + StaticConf.logoName;
  summaryText = "";
  location = "";
  address = "";
  phone = "";
  email = "";
  links: Array<Link> = [];

  private config(): void {
    if (environment.production) {
      this.logoPath = StaticConf.s3backetPath + StaticConf.imagesPath + StaticConf.logoName;
    }
  }

  ngOnInit(): void {
    this.headerService.getHeaderData().subscribe(data => {
      this.headerData = data;
      this.summaryText = this.headerData.summaryText;
      this.location = this.headerData.location;
      this.address = this.headerData.address;
      this.phone = this.headerData.phone;
      this.email = this.headerData.email;
      this.links = this.headerData.links;
    });
  }

  onAnminClick() {
    this.router.navigate(['/app-admin']);
  }
  onLoginClick() {
    this.loginFormModal.open();
  }
}
