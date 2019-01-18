import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  selectedData = new SelectionModel<any>(true, []);
  private _data;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() columns: string[];
  @Output() selected = new EventEmitter();
  @Input('data') set data(data: any[]) {
    this.reflect(new MatTableDataSource(data));
  }

  clearSelected(): void {
    this.selectedData.clear();
  }

  isAllSelected(): boolean {
    return this.selectedData.selected.length === this._data.data.length;
  }

  masterToggle(): void {
    this.isAllSelected() ? this.selectedData.clear() : this._data.data.forEach(row => this.selectedData.select(row));
    this.selected.emit(this.selectedData);
  }

  checkChanged(row): void {
    this.selectedData.toggle(row);
    this.selected.emit(this.selectedData);
  }

  private reflect(data: MatTableDataSource<any>): void {
    this._data = data;
    this._data.paginator = this.paginator;
  }
}
