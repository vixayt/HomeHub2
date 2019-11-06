import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = null;
  password: string = null;
  errorMessage: string = null;

  constructor(private authService: AngularFireAuth) {}
  login() {
    this.authService.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.errorMessage = null;
        console.log('Successfully Logged in');
        console.log(result);
      })
      .catch(err => {
        this.errorMessage = err;
      });
  }
  logout() {
    this.authService.auth.signOut();
  }
  ngOnInit() {}
}
