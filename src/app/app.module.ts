import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Services
import { LoginService } from './services/login.service';
import { AlertService } from './services/alert.service';
import { BookingService } from './services/booking.service';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import { routing } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS   } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorInterceptor } from './helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    LoginService,
    AlertService,
    BookingService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
