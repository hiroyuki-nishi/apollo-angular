import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';

import { CreateApplicationsGQL, DeleteApplicationsGQL, ListApplications, ListApplicationsGQL, Maybe } from '../../generated/graphql';
import Items = ListApplications.Items;
import { GridComponent } from '../grid/grid.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(GridComponent) private grid: GridComponent;
  dataSource: Maybe<(Maybe<Items>)[]>;
  displayedColumns = ['select', 'id', 'itunesstore_id', 'updated'];
  selectedData: SelectionModel<Maybe<(Maybe<Items>)[]>>;
  appName: string;
  private companyId = 'example';

  constructor(
    private listApplicationsGQL: ListApplicationsGQL,
    private createApplicationsGQL: CreateApplicationsGQL,
    private deleteApplicationsGQL: DeleteApplicationsGQL
  ) {}

  ngOnInit(): void {
    this.findApplications();
  }

  dataSelected(data: SelectionModel<Maybe<(Maybe<Items>)[]>>): void {
    this.selectedData = data;
  }

  addApplication(): void {
    this.createApplicationsGQL.mutate({
      createapplicationsinput: {
        id: Math.random().toString(36).slice(-8),
        company_id: this.companyId,
        itunesstore_id: this.appName,
        updated: new Date().toString()
      }
    }).pipe(map(x => x.data)).subscribe(
      res => this.dataSource = this.dataSource.concat(res.createApplications),
      error => console.log(error)
    );
  }

  private findApplications(): void {
    this.listApplicationsGQL.watch().valueChanges.pipe(
      map(x => x.data)
    ).subscribe(res => this.dataSource = res.listApplications.items);
  }

  deleteApplications(data: SelectionModel<Maybe<(Maybe<Items>)>>): void {
    data.selected.forEach(x => this.deleteApplication(x));
  }

  private deleteApplication(item: Maybe<(Maybe<Items>)>): void {
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
}
