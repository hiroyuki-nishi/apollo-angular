import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlService } from './graphql.service';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    ApolloModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    GraphqlService,
    { provide: APP_INITIALIZER, useFactory: (service: GraphqlService) => () => service.hydrated(), deps: [GraphqlService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}