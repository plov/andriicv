import { Injectable } from '@angular/core';
import { StaticConf } from '../../staticconf';
import { S3Service } from '../s3/s3-service.service';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Header } from '../../models/header-info/header';
import { Link } from '../../models/header-info/link';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderProviderService {

  private dataPath: string = StaticConf.localPath + StaticConf.dataPath
  private isLoggedIn: boolean = false;

  constructor(private s3Service: S3Service, private authService: AuthService) {
    this.config()
    this.authService.isLoggedIn().subscribe((data) => this.onLogin(data));
  }

  onLogin(data:any){
    this.isLoggedIn = data;
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath;
    }
  }

  private getHeaderJsonFromS3(): Observable<any> {
    return this.s3Service.readJsonFile(StaticConf.dataPath, StaticConf.headerInfo);
  }

  private mapHeaderData(data: any): Header {
    this.authService.isLoggedIn()
    const header = new Header();
    header.name = data.name;
    header.lastName = data.lastName;
    header.position = data.position;
    header.status = data.status;
    header.USstatus = this.isLoggedIn ? data.USstatus : "US Citizen";
    header.phone = this.isLoggedIn ? data.phone : "+12345678901";
    header.email = this.isLoggedIn ? data.email : "mail@gmail.com";
    header.address = this.isLoggedIn ? data.address : "1234 Main St, City, State, 12345";
    header.location = data.location;
    header.summaryText = data.summaryText.join(' ');

    header.links = data.links.map((link: any) => {
      const mappedLink = new Link();
      mappedLink.name = link.name;
      mappedLink.url = link.link || link.Link;
      mappedLink.icon = link.icon;
      mappedLink.isBlurred = link.isBlurred;
      return mappedLink;
    });

    return header;
  }

  getHeaderData(): Observable<any> {
    return this.getHeaderJsonFromS3().pipe(
      map(data => this.mapHeaderData(data))
    );
  }
}
