import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CreateApplicationsGQL, ListApplications, ListApplicationsGQL, Maybe } from '../../generated/graphql';
import Items = ListApplications.Items;
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Maybe<(Maybe<Items>)>>;
  displayedColumns: string[] = ['select', 'id', 'itunesstore_id', 'updated'];
  selection = new SelectionModel<Maybe<(Maybe<Items>)>>(true, []);
  name: string;

  constructor(
    private listApplicationsGQL: ListApplicationsGQL,
    private applicationMutation: CreateApplicationsGQL
  ) {}

  ngOnInit(): void {
    this.findApplications();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
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
    this.listApplicationsGQL.watch().valueChanges.pipe(
      map(x => x.data)
    ).subscribe(res => this.refrect(res.listApplications.items));
  }

  private refrect(applications: Maybe<(Maybe<Items>)[]>): void {
    this.dataSource = new MatTableDataSource(applications);
    this.dataSource.paginator = this.paginator;
  }
}
