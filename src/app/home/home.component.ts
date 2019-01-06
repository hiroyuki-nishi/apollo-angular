import { Component, OnInit } from '@angular/core';
import { Application, Profile, ApplicationQuery } from '../grapql/applicaiton-query.service';
import { map } from 'rxjs/operators';
import { ApplicationMutation } from '../grapql/application-mutation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  applications: Application[];
  profiles: Profile[];

  constructor(private applicationQuery: ApplicationQuery, private applicationMutation: ApplicationMutation) {
  }

  ngOnInit(): void {
    this.applicationQuery.watch().valueChanges.pipe(
      map(x => x.data)
    ).subscribe(res => {
      this.applications = res.listApplications.items;
      this.profiles = res.listProfiles.items;
    });
  }

  addApplication(): void {
    // TODO 型指定する
    this.applicationMutation.mutate({
      createapplicationsinput: {
        company_id: 'test',
        id: 'test',
      }
    }).pipe(
      map(x => x.data)
    ).subscribe(
      res => console.log(res),
      error => console.log(error)
    );
  }
}
