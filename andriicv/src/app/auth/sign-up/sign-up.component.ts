import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService) {}

  signUp() {
    this.authService.signIn(this.username, this.password)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }
}
