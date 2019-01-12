import { MatCheckboxModule, MatIconModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridComponent } from './grid.component';

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule {
}
