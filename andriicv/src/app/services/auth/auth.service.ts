import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<boolean>(false);
  private isAdmin = new BehaviorSubject<boolean>(false);

  constructor(private apiService: ApiService, private cookieService: CookieService) {
    this.checkLoginState();
  }

  checkLoginState(): void {
    const tokenData = this.getStoredTokenData();
    const token = tokenData?.token;
    if (token) {
      this.apiService.validateToken(token).subscribe(response => {
        const valid = JSON.parse(response.body) as { valid: boolean, decoded: any };
        this.authState.next(valid.valid);
      }, () => {
        this.authState.next(false);
      });
    } else {
      this.authState.next(false);
    }
  }

  getStoredTokenData(): { token: string, viewerType: string } | null {
    const cookieValue = this.cookieService.get('Authorization');
    if (cookieValue) {
      try {
        return JSON.parse(cookieValue);
      } catch (e) {
        console.error('Error parsing cookie value:', e);
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): Observable<boolean> {
    return this.authState.asObservable();
  }

  isAdministrator(): Observable<boolean> {
    const tokenData = this.getStoredTokenData();
    if(tokenData?.viewerType === 'admin') {
      this.isAdmin.next(true);
    }
    return this.isAdmin.asObservable();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(false);
  }
}