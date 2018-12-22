import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ApolloModule } from 'apollo-angular';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlService } from './graphql.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [
    GraphqlService,
    { provide: APP_INITIALIZER, useFactory: (service: GraphqlService) => () => service.hydrated(), deps: [GraphqlService], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
