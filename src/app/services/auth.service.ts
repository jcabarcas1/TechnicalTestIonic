import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fAuth: AngularFireAuth) { }

  async logIn(user: User) {

    return await this.fAuth.auth.signInWithEmailAndPassword(user.username + '@dummydomainlogin.com', user.password);

  }

  logOut() {

    return this.fAuth.auth.signOut();

  }

  getUserLogged() {

    return this.fAuth.auth.currentUser;

  }

}
