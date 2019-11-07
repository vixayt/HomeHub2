import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { from, Observable, BehaviorSubject } from 'rxjs';
import { UserModel } from '../user.model';
import { Router } from '@angular/router';

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
          const user = new UserModel(email, firstName, lastName);
          console.log(user);
          this.user.next(user);
          return result;
        })
        .catch(error => {
          return error;
        })
    );
  }

  login(form: NgForm): Observable<UserCredential> {
    return from(
      this.authService.auth
        .signInWithEmailAndPassword(form.value.email, form.value.password)
        .then(result => {
          const user = new UserModel(form.value.email);
          this.user.next(user);
          return result;
        })
        .catch(error => {
          return error;
        })
    );
    // const data = this.angularFirestore.firestore
    //   .collection('User')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       if (doc.data().email === form.value.email) {
    //         const email = doc.data().email;
    //         const firstName = doc.data().firstName;
    //         const lastName = doc.data().lastName;
    //       }
    //     });
    //   });
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['login']);
  }
}
