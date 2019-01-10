import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CreateApplicationsGQL, DeleteApplicationsGQL, ListApplications, ListApplicationsGQL, Maybe } from '../../generated/graphql';
import { SelectionModel } from '@angular/cdk/collections';
import Items = ListApplications.Items;

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Maybe<(Maybe<Items>)>>;
  displayedColumns = ['select', 'id', 'itunesstore_id', 'updated'];
  selectedData = new SelectionModel<Maybe<(Maybe<Items>)>>(true, []);
  name: string;
  private companyId = 'example';

  constructor(
    private listApplicationsGQL: ListApplicationsGQL,
    private createApplicationsGQL: CreateApplicationsGQL,
    private deleteApplicationsGQL: DeleteApplicationsGQL
  ) {}

  ngOnInit(): void {
    this.findApplications();
  }

  isAllSelected(): boolean {
    return this.selectedData.selected.length === this.dataSource.data.length;
  }

  masterToggle(): void {
    this.isAllSelected() ?
        this.selectedData.clear() :
        this.dataSource.data.forEach(row => this.selectedData.select(row));
  }

  addApplication(): void {
    this.createApplicationsGQL.mutate({
      createapplicationsinput: {
        id: Math.random().toString(36).slice(-8),
        company_id: this.companyId,
        itunesstore_id: this.name,
        updated: new Date().toString()
      }
    }).pipe(map(x => x.data)).subscribe(
      res => this.refrect(this.dataSource.data.concat(res.createApplications)),
      error => console.log(error)
    );
  }

  deleteApplications(data: SelectionModel<Maybe<(Maybe<Items>)>>): void {
    data.selected.forEach(x => this.deleteApplication(x));
  }

  private findApplications(): void {
    this.listApplicationsGQL.watch().valueChanges.pipe(
      map(x => x.data)
    ).subscribe(res => this.refrect(res.listApplications.items));
  }

  private deleteApplication(item: Maybe<(Maybe<Items>)>): void {
    console.log(this.companyId, item.id)
    this.deleteApplicationsGQL.mutate({
      deleteApplicationsInput: {
        company_id: this.companyId,
        id: item.id
      }
    }).pipe(map(x => x.data)).subscribe(
      res => console.log(res),
      // TODO
      // res => this.refrect(this.dataSource.data.concat(res.deleteApplications)),
      error => console.log(error)
    );
  }

  private refrect(applications: Maybe<(Maybe<Items>)[]>): void {
    this.dataSource = new MatTableDataSource(applications);
    this.dataSource.paginator = this.paginator;
  }
}
