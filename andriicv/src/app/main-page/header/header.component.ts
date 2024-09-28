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
import { InfoLabelComponent } from '../info-label/info-label.component';
import { InfoLabelModel } from '../../models/header-info/info-label-model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule, LoginformComponent, InfoLabelComponent],
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
  path = StaticConf.localPath;
  name = "";
  lastName = "";
  position = "";
  summaryText = "";
  status: InfoLabelModel = new InfoLabelModel();
  location: InfoLabelModel = new InfoLabelModel();
  address: InfoLabelModel = new InfoLabelModel();
  phone: InfoLabelModel = new InfoLabelModel();
  email: InfoLabelModel = new InfoLabelModel();
  links: Array<Link> = [];
  USstatus: InfoLabelModel = new InfoLabelModel();

  private config(): void {
    if (environment.production) {
      this.path = StaticConf.s3backetPath;
    }
  }

  ngOnInit(): void {
    this.headerService.getHeaderData().subscribe(data => {
      this.headerData = data;
      this.name = this.headerData.name;
      this.position = this.headerData.position;
      this.lastName = this.headerData.lastName;
      this.summaryText = this.headerData.summaryText;

      this.status.textValue = this.headerData.status,
        this.status.iconSrc = this.path + StaticConf.greenPointIcon;

      this.location.textValue = this.headerData.location,
        this.location.iconSrc = this.path + StaticConf.pointIcon;

      this.address.textValue = data.address;
      this.address.iconSrc = this.path + StaticConf.homeIcon;
      this.address.isBlurred = true;

      this.phone.textValue = data.phone;
      this.phone.iconSrc = this.path + StaticConf.phoneIcon;
      this.phone.isBlurred = true;

      this.email.textValue = data.email;
      this.email.iconSrc = this.path + StaticConf.letterIcon;
      this.email.isBlurred = true;

      this.USstatus.textValue = data.USstatus;
      this.USstatus.iconSrc = this.path + StaticConf.flagIcon;
      this.USstatus.isBlurred = true;

      this.links = data.links;
      this.links.forEach(link => {
        link.icon = this.path + StaticConf.smallIcons + link.icon;
      });
    });
  }

  onAnminClick() {
    this.router.navigate(['/app-admin']);
  }
  onLoginClick() {
    this.loginFormModal.open();
  }
}
