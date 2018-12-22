import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Application, QueryGQL, Profile } from './query.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GraphQL with Apollo';
  applications: Application[];
  profiles: Profile[];

  constructor(private service: QueryGQL) {}

  ngOnInit(): void {
    this.service.watch().valueChanges.pipe(
      map(v => v.data)
    ).subscribe(res => {
      this.applications = res.listApplications.items;
      this.profiles = res.listProfiles.items;
    });
  }
}
