import { Injectable } from '@angular/core';
import { getCurrentUser } from 'aws-amplify/auth';
import { signIn } from 'aws-amplify/auth';
import { signUp } from 'aws-amplify/auth';
import { confirmSignUp } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signUp(username: string, password: string) {
    return signUp({
      username,
      password,
    });
  }

  confirmSignUp(username: string, code: string) {
    return confirmSignUp({
      username,
      confirmationCode: code
    });
  }

  signIn(username: string, password: string) {
    return signIn({
     username,
      password
    });
  }

  signOut() {
    return signOut();
  }

  async currentUser() {
    return await getCurrentUser();
  }
}
