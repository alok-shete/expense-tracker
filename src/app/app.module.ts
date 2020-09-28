import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ErrorComponent } from './components/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ErrorComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
