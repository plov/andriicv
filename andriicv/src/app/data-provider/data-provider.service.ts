import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private httpClient: HttpClient) { }


  getJson(): Observable<any> {
    return this.httpClient.get('assets/data/info.json');
  }
  
  getSkills(): Observable<Array<string>> {
    return this.getJson().pipe(
      map(data => {
        return data.skills;
      })
    );
  }

}
