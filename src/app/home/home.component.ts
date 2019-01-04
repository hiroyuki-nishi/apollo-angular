import {Component, OnInit} from '@angular/core';
import {Application, Profile, QueryGQL} from '../query.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
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
