import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

export interface CreateApplications {
  company_id: string;
  id: string;
  itunesstore_id: string;
  updated: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationMutation extends Mutation<CreateApplications> {
  document = gql`
    mutation createApplications($createapplicationsinput: CreateApplicationsInput!) {
      createApplications(input: $createapplicationsinput) {
        company_id
        id
        itunesstore_id
        updated
      }
    }
  `;
}

