import { Component, OnInit, ViewChild } from '@angular/core';
import { Application, ApplicationQuery } from '../grapql/applicaiton-query.service';
import { map } from 'rxjs/operators';
import { ApplicationMutation } from '../grapql/application-mutation.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Application>;
  displayedColumns: string[] = ['id', 'itunesstore_id', 'updated'];
  name: string;

  constructor(
    private applicationQuery: ApplicationQuery,
    private applicationMutation: ApplicationMutation) {
  }

  ngOnInit(): void {
    this.findApplications();
  }

  addApplication(): void {
    this.applicationMutation.mutate({
      createapplicationsinput: {
        id: Math.random().toString(36).slice(-8),
        company_id: 'example',
        itunesstore_id: this.name,
        updated: new Date().toString()
      }
    }).pipe(
      map(x => x.data)
    ).subscribe(
      res => this.refrect(this.dataSource.data.concat(res.createApplications)),
      error => console.log(error)
    );
  }

  private findApplications(): void {
    this.applicationQuery.watch().valueChanges.pipe(
      map(x => x.data)
    ).subscribe(res => this.refrect(res.listApplications.items));
  }

  private refrect(applications: Application[]): void {
    this.dataSource = new MatTableDataSource(applications);
    this.dataSource.paginator = this.paginator;
  }
}
