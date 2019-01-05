import AWSAppSyncClient from 'aws-appsync';
import { AUTH_TYPE } from 'aws-appsync/lib';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import {Auth} from 'aws-amplify';
import {NormalizedCacheObject} from 'apollo-cache-inmemory';


@Injectable()
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  hydrated() {
    const appsyncClient = new AWSAppSyncClient({
      disableOffline: true,
      url: 'https://yb3pqoxy5jernkuzx4xybuzjuy.appsync-api.ap-northeast-1.amazonaws.com/graphql',
      region: 'ap-northeast-1',
      auth: {
        type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
        jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
      },
    });
    this.apollo.setClient(appsyncClient as any);
    return appsyncClient.hydrated();
  }
}
