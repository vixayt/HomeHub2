import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { UserModel } from "../user.model";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { LoginService, UserCredential } from "./login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  currentUser: UserModel;

  constructor(private loginService: LoginService, private router: Router) {}

  loginButton(form: NgForm) {
    this.isLoading = true;
    this.errorMessage = null;
    if (!form.valid) {
      return;
    }

    let authObs: Observable<UserCredential>;

    if (this.isLoginMode) {
      authObs = this.loginService.login(form);
    } else {
      authObs = this.loginService.signup(form);
    }

    authObs.subscribe(resData => {
      this.isLoading = false;
      if (resData.message) {
        this.errorMessage = resData.message;
      } else {
        this.router.navigate([""]);
      }
    });
    form.reset();
  }

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  logout() {
    this.loginService.logout();
    console.log("psh, logout?");
  }

  ngOnInit() {}
}
