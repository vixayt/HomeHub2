import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrimetComponent } from './trimet/trimet.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireAuthGuard,
  AngularFireAuthGuardModule
} from '@angular/fire/auth-guard';
import { WeatherComponent } from './weather/weather.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AngularFireAuthGuard] },
  {
    path: 'trimet',
    component: TrimetComponent,
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'weather',
    component: WeatherComponent,
    canActivate: [AngularFireAuthGuard]
  },
  { path: 'login', component: LoginComponent }
];

var config = {
  apiKey: 'AIzaSyCDDdhQOwxcJeuDO_UdOdtmaumDtTvcX_A',
  authDomain: 'homehub-aa8bd.firebaseapp.com',
  databaseURL: 'https://homehub-aa8bd.firebaseio.com',
  projectId: 'homehub-aa8bd',
  storageBucket: 'homehub-aa8bd.appspot.com',
  messagingSenderId: '136727974762',
  appId: '1:136727974762:web:461087de271141fd734b13'
};

@NgModule({
  declarations: [
    AppComponent,
    TrimetComponent,
    WeatherComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireAuthGuardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
