import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule, MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlService } from './grapql/graphql.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    ApolloModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    GraphqlService,
    {provide: APP_INITIALIZER, useFactory: (service: GraphqlService) => () => service.hydrated(), deps: [GraphqlService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
