export type Maybe<T> = T | null;

export interface TableApplicationsFilterInput {
  company_id?: Maybe<TableStringFilterInput>;

  id?: Maybe<TableStringFilterInput>;

  itunesstore_id?: Maybe<TableStringFilterInput>;

  updated?: Maybe<TableStringFilterInput>;
}

export interface TableStringFilterInput {
  beginsWith?: Maybe<string>;

  between?: Maybe<(Maybe<string>)[]>;

  contains?: Maybe<string>;

  eq?: Maybe<string>;

  ge?: Maybe<string>;

  gt?: Maybe<string>;

  le?: Maybe<string>;

  lt?: Maybe<string>;

  ne?: Maybe<string>;

  notContains?: Maybe<string>;
}

export interface TableProfilesFilterInput {
  company_id?: Maybe<TableStringFilterInput>;

  id?: Maybe<TableStringFilterInput>;

  identifier?: Maybe<TableStringFilterInput>;

  updated?: Maybe<TableStringFilterInput>;
}

export interface CreateApplicationsInput {
  company_id: string;

  id: string;

  itunesstore_id?: Maybe<string>;

  updated?: Maybe<string>;
}

export interface CreateProfilesInput {
  company_id: string;

  id: string;

  identifier?: Maybe<string>;

  updated?: Maybe<string>;
}

export interface DeleteApplicationsInput {
  company_id: string;

  id: string;
}

export interface DeleteProfilesInput {
  company_id: string;

  id: string;
}

export interface UpdateApplicationsInput {
  company_id: string;

  id: string;

  itunesstore_id?: Maybe<string>;

  updated?: Maybe<string>;
}

export interface UpdateProfilesInput {
  company_id: string;

  id: string;

  identifier?: Maybe<string>;

  updated?: Maybe<string>;
}

export interface TableBooleanFilterInput {
  eq?: Maybe<boolean>;

  ne?: Maybe<boolean>;
}

export interface TableFloatFilterInput {
  between?: Maybe<(Maybe<number>)[]>;

  contains?: Maybe<number>;

  eq?: Maybe<number>;

  ge?: Maybe<number>;

  gt?: Maybe<number>;

  le?: Maybe<number>;

  lt?: Maybe<number>;

  ne?: Maybe<number>;

  notContains?: Maybe<number>;
}

export interface TableIdFilterInput {
  beginsWith?: Maybe<string>;

  between?: Maybe<(Maybe<string>)[]>;

  contains?: Maybe<string>;

  eq?: Maybe<string>;

  ge?: Maybe<string>;

  gt?: Maybe<string>;

  le?: Maybe<string>;

  lt?: Maybe<string>;

  ne?: Maybe<string>;

  notContains?: Maybe<string>;
}

export interface TableIntFilterInput {
  between?: Maybe<(Maybe<number>)[]>;

  contains?: Maybe<number>;

  eq?: Maybe<number>;

  ge?: Maybe<number>;

  gt?: Maybe<number>;

  le?: Maybe<number>;

  lt?: Maybe<number>;

  ne?: Maybe<number>;

  notContains?: Maybe<number>;
}

// ====================================================
// Documents
// ====================================================

export namespace CreateApplications {
  export type Variables = {
    createapplicationsinput: CreateApplicationsInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    createApplications: Maybe<CreateApplications>;
  };

  export type CreateApplications = {
    __typename?: "Applications";

    company_id: string;

    id: string;

    itunesstore_id: Maybe<string>;

    updated: Maybe<string>;
  };
}

export namespace DeleteApplications {
  export type Variables = {
    deleteApplicationsInput: DeleteApplicationsInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    deleteApplications: Maybe<DeleteApplications>;
  };

  export type DeleteApplications = {
    __typename?: "Applications";

    company_id: string;

    id: string;
  };
}

export namespace ListApplications {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    listApplications: Maybe<ListApplications>;
  };

  export type ListApplications = {
    __typename?: "ApplicationsConnection";

    items: Maybe<(Maybe<Items>)[]>;
  };

  export type Items = {
    __typename?: "Applications";

    id: string;

    itunesstore_id: Maybe<string>;

    updated: Maybe<string>;
  };
}

// ====================================================
// START: Apollo Angular template
// ====================================================

import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular";

import gql from "graphql-tag";

// ====================================================
// Apollo Services
// ====================================================

@Injectable({
  providedIn: "root"
})
export class CreateApplicationsGQL extends Apollo.Mutation<
  CreateApplications.Mutation,
  CreateApplications.Variables
> {
  document: any = gql`
    mutation createApplications(
      $createapplicationsinput: CreateApplicationsInput!
    ) {
      createApplications(input: $createapplicationsinput) {
        company_id
        id
        itunesstore_id
        updated
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class DeleteApplicationsGQL extends Apollo.Mutation<
  DeleteApplications.Mutation,
  DeleteApplications.Variables
> {
  document: any = gql`
    mutation deleteApplications(
      $deleteApplicationsInput: DeleteApplicationsInput!
    ) {
      deleteApplications(input: $deleteApplicationsInput) {
        company_id
        id
      }
    }
  `;
}
@Injectable({
  providedIn: "root"
})
export class ListApplicationsGQL extends Apollo.Query<
  ListApplications.Query,
  ListApplications.Variables
> {
  document: any = gql`
    query listApplications {
      listApplications {
        items {
          id
          itunesstore_id
          updated
        }
      }
    }
  `;
}

// ====================================================
// END: Apollo Angular template
// ====================================================
