import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ViwerModel } from '../../models/viwer/viwer-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://yxnld64z44.execute-api.us-east-1.amazonaws.com/PlovStage/viwer';

  constructor(private http: HttpClient) { }

  // Method to send a POST request to save a new viwer
  addViwer(viwer: ViwerModel): Observable<any> {
    const url = `${this.apiUrl}`;
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "*" });
      const body = JSON.stringify({
        body: JSON.stringify({
          name: viwer.name,
          email: viwer.email,
          pin: viwer.hash,
          expiration: viwer.expirationDate,
          visit: viwer.lastVisited
        })
      });
    return this.http.post(url, body, { headers: headers });
  }

  // Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token
}
