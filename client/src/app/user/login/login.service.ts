import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { unescapeIdentifier } from '@angular/compiler';

interface UserMetaData {
  creationTime: string;
  lastSignInTime: string;
}

interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  uid: string;
}

interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  metadata: UserMetaData;
  phoneNumber: string | null;
  photoURL: string | null;
  providerData: UserInfo[];
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

interface AuthCredential {
  providerId: string;
  signInMethod: string;
}

interface AdditionalUserInfo {
  isNewUser: boolean;
  profile: Object | null;
  providerId: string;
  username?: string | null;
}

export interface UserCredential {
  additionalUserInfo?: AdditionalUserInfo | null;
  credential: AuthCredential | null;
  operationType?: string | null;
  user: User | null;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  user = new BehaviorSubject<UserModel>(null);
  helper = new JwtHelperService();

  constructor(
    private authService: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {}

  signup(form: NgForm): Observable<UserCredential> {
    const email: string = form.value.email;
    const firstName: string = form.value.firstName;
    const lastName: string = form.value.lastName;
    return from(
      this.authService.auth
        .createUserWithEmailAndPassword(form.value.email, form.value.password)
        .then(result => {
          const id = this.angularFirestore.createId();
          this.angularFirestore.collection('User').add({
            email,
            firstName,
            lastName,
            id
          });
          const helper = JSON.parse(JSON.stringify(this.authService.auth.currentUser));
          const myRawToken = helper.stsTokenManager.accessToken;
          const expirationDate = new Date(this.helper.getTokenExpirationDate(myRawToken)).getTime();
          const uid = helper.uid;
          this.handleAuthentication(email, uid, expirationDate, firstName, lastName);
          return result;
        })
        .catch(error => {
          return error;
        })
    );
  }

  autoLogin() {
    const userData: {
      email: string;
      uid: string;
      _tokenExpirationDate: number;
      firstName?: string;
      lastName?: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.email, 
      userData.uid,
      new Date(userData._tokenExpirationDate), 
      userData.firstName, 
      userData.lastName 
    );
    if (loadedUser.uid) {
      this.user.next(loadedUser)
    }
  }

  login(form: NgForm): Observable<UserCredential> {
    const email = form.value.email;
    const helper = JSON.parse(JSON.stringify(this.authService.auth.currentUser));
    const myRawToken = helper.stsTokenManager.accessToken;
    const uid = helper.uid;
    const expirationDate = new Date(this.helper.getTokenExpirationDate(myRawToken)).getTime();
    // const isExpired = this.helper.isTokenExpired(myRawToken);
    
    return from(
      this.authService.auth
        .signInWithEmailAndPassword(email, form.value.password)
        .then(result => {
          this.handleAuthentication(email, uid, expirationDate);
          return result;
        })
        .catch(error => {
          return error;
        })
    );
  }

  private handleAuthentication(email: string, uid: string, expirationDate: number, firstName?: string, lastName?: string) {
    const user = new UserModel(email, uid, new Date(expirationDate), firstName, lastName);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user))
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['login']);
  }
}
