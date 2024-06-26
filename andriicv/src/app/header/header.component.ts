import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor() {
    this.config()
  }

  title = 'andriicv';
  logoPath = "assets/images/logo_name.png"

  private config(): void {
    if (environment.production) {
      console.log("environment.production: " + environment.production)
      this.logoPath = "https://andriicv-bucket.s3.amazonaws.com/images/logo_name.png"
    }
  }
}
