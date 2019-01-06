import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

export interface Application {
  id: string;
  itunesstore_id: string;
  updated: string;
}

export interface Profile {
  identifier: string;
}

export interface ApplicationsWithProfiles {
  listApplications: {
    items: Application[];
  };
  listProfiles: {
    items: Profile[];
  };
}


@Injectable({
  providedIn: 'root',
})
export class ApplicationQuery extends Query<ApplicationsWithProfiles> {
  document = gql`
    query {
      listApplications {
        items {
          id
          itunesstore_id
          updated
        }
      }
      listProfiles {
        items {
          identifier
        }
      }
    }
  `;
}
