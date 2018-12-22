import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';


@Injectable()
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  hydrated() {
    const appsyncClient = new AWSAppSyncClient({
      disableOffline: true,
      url: '<Your AppSync Api Url>',
      region: '<Your AppSync Api Region>',
      auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: '<Your AppSync ApiKey>',
      },
    });
    this.apollo.setClient(appsyncClient);
    return appsyncClient.hydrated();
  }
}
