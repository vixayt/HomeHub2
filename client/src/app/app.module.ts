import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TrimetComponent } from "./trimet/trimet.component";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import {
  AngularFireAuthGuard,
  AngularFireAuthGuardModule
} from "@angular/fire/auth-guard";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { WeatherComponent } from "./weather/weather.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./user/login/login.component";
import { LoadingSpinnerComponent } from "./utils/loading-spinner/loading-spinner.component";
import { HeaderComponent } from "./header/header.component";
import { AuthGuard } from "./user/login/login.guard";
import { FootballComponent } from "./football/football.component";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AngularFireAuthGuard] },
  {
    path: "trimet",
    component: TrimetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "weather",
    component: WeatherComponent
  },
  { path: "login", component: LoginComponent },
  { path: "football", component: FootballComponent }
];

var config = {
  apiKey: "AIzaSyCDDdhQOwxcJeuDO_UdOdtmaumDtTvcX_A",
  authDomain: "homehub-aa8bd.firebaseapp.com",
  databaseURL: "https://homehub-aa8bd.firebaseio.com",
  projectId: "homehub-aa8bd",
  storageBucket: "homehub-aa8bd.appspot.com",
  messagingSenderId: "136727974762",
  appId: "1:136727974762:web:461087de271141fd734b13"
};

@NgModule({
  declarations: [
    AppComponent,
    TrimetComponent,
    WeatherComponent,
    HomeComponent,
    LoginComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    FootballComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
