import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { OkCancelDialogComponent } from '../ok-cancel-dialog/ok-cancel-dialog.component';
import { ActiveRoutesService } from '../services/active-routes.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  $displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'actions'];
  $dataSource = new MatTableDataSource(ELEMENT_DATA);
  $selection = new SelectionModel<PeriodicElement>(true, []);
  $currentComponent: string = "";
  $SideNavOpen: boolean = true;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private _activeRouteService: ActiveRoutesService) { }

  ngOnInit() {
    this.$dataSource.sort = this.sort;
    this._activeRouteService.SideNavToggled.subscribe(x => {
      console.log("x:", x);
      if (x != null) {
        this.$SideNavOpen = x.sideNavStatus == "open";
        this.$currentComponent = x.currentRoute.title;
      }
    })
  }

  applyFilter(filterValue: string) {
    this.$dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.$selection.selected.length;
    const numRows = this.$dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear $selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.$selection.clear() :
      this.$dataSource.data.forEach(row => this.$selection.select(row));
  }

  onAdd() {
    const dialogRef = this.dialog.open(ExpenseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // create the item
      }
    });
  }

  onEdit(item) {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, { data: { title: item.name } });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // update the item
      }
    });
  }

  onDelete(item: PeriodicElement) {
    const dialogRef = this.dialog.open(OkCancelDialogComponent, {
      data:
      {
        title: "Confirm delete",
        message: "Are you sure you want to delete this item?",
        okValue: true,
        cancelValue: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // delete the item
      }
    });
  }

  onDeleteMultiple(items: SelectionModel<PeriodicElement>) {
    const dialogRef = this.dialog.open(OkCancelDialogComponent, {
      data:
      {
        title: `Confirm delete ${items.selected.length} seletced`,
        message: `Are you sure you want to delete these item(s)?`,
        okValue: true,
        cancelValue: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // delete the items
      }
    });
  }
}
