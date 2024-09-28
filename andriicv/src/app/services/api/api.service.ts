import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ViewerModel } from '../../models/viewer/viewer-model';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse, Viewer } from './auth-response';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.apiUrl;
  private viewerResource = "viewer";
  private allViewersResource = "viewers";
  private deleteViewersResource = "viewers/delete";
  private viewerByPinResource = "viwer_by_pin";
  private validateTokenResource = "validation";


  constructor(private http: HttpClient, private cookieService: CookieService) { }

  // Method to send a POST request to save a new viwer
  addViwer(viewer: ViewerModel): Observable<any> {
    const url = `${this.apiUrl + this.viewerResource}`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, });
    const body = JSON.stringify({
      body: JSON.stringify({
        name: viewer.name,
        email: viewer.email,
        pin: viewer.pincode,
        created: viewer.createdDate,
        expiration: viewer.expirationDays,
        visit: viewer.lastVisited,
        type: viewer.type
      })
    });
    return this.http.post(url, body, { headers: headers, withCredentials: true });
  }

  getViwers(): Observable<any> {
    const url = `${this.apiUrl + this.allViewersResource}`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, });
    console.log('headers:', headers);
    return this.http.get(url, { headers: headers, withCredentials: true });
  }

  deleteViewers(viewers: ViewerModel[]): Observable<any> {
    const url = `${this.apiUrl + this.deleteViewersResource}`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, });
    const body = JSON.stringify({ viewers });
    return this.http.post(url, body, { headers: headers, withCredentials: true });
  }

  login(pinCode: string): Observable<AuthResponse> {
    const url = `${this.apiUrl + this.viewerByPinResource}`;
    const token = this.getStoredToken();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', });
    const body = JSON.stringify({
      body: JSON.stringify({ pin: pinCode })
    });
    return this.http.post<AuthResponse>(url, body, { headers: headers, withCredentials: true })
      .pipe(
        tap(response => {
          console.log('login response:', response);
          if (response.statusCode === 200) {
          
              const parsedBody = JSON.parse(response.body) as { viewer: Viewer, token: string };
              const token = parsedBody.token;
              const viewerType = parsedBody.viewer.type;
              const cookieValue = JSON.stringify({ token, viewerType });

              this.cookieService.set('Authorization', cookieValue, { path: '/', secure: true, sameSite: 'Lax' });
          }
        })
      );
  }

  validateToken(token: string): Observable<any> {
    const url = this.apiUrl + this.validateTokenResource;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token, });
    const body = JSON.stringify({
      body: JSON.stringify({ token: token })
    });
    return this.http.post(url, body, { headers: headers, withCredentials: true });
  }

  //getProtectedData(): Observable<any> {
  //  return this.http.get<any>(`${this.apiUrl}/protected-resource`, { withCredentials: true });
  //}

  getStoredToken(): string {
    const cookieValue = this.cookieService.get('Authorization');
    if (cookieValue) {
      try {
        const value = JSON.parse(cookieValue);
        return value?.token;
      } catch (e) {
        console.error('Error parsing cookie value:', e);
        return "";
      }
    }
    return "";
  }
}
