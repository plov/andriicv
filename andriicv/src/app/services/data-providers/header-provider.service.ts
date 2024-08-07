import { Injectable } from '@angular/core';
import { StaticConf } from '../../staticconf';
import { S3Service } from '../s3/s3-service.service';
import { AppStateService } from '../state-servises/app-state-service.service';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Header } from '../../models/header-info/header';
import { Link } from '../../models/header-info/link';

@Injectable({
  providedIn: 'root'
})
export class HeaderProviderService {

  private dataPath: string = StaticConf.localPath + StaticConf.dataPath

  constructor(private s3Service: S3Service, private appStateService: AppStateService) { 
    this.config()
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
      const header = new Header();
      header.phone = data.phone;
      header.email = data.email;
      header.address = data.address;
      header.location = data.location;
      header.summaryText = data.summaryText.join(' '); // Join array elements into a single string
  
      header.links = data.links.map((link: any) => {
        const mappedLink = new Link();
        mappedLink.name = link.name;
        mappedLink.url = link.link || link.Link; // Handle both possible keys
        mappedLink.icon = link.icon;
        return mappedLink;
      });
  
      return header;
  }

  // Example method to use the fetched header.json data
  getHeaderData(): Observable<any> {
    return this.getHeaderJsonFromS3().pipe(
      map(data => this.mapHeaderData(data))
    );
  }
}
