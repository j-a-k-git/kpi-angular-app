import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { OkCancelDialogComponent } from '../ok-cancel-dialog/ok-cancel-dialog.component';
import { AppNavigationService, NavBarStatus } from '../services/app-navigation/app-navigation.service';
import { ExpenseItem, ExpenseService, ExpenseItemVM } from 'xpense-api';
import { Subscription } from 'rxjs';
import { SlideInOutAnimation } from '../animations/slide-in-out-animation';


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
  animations: [
    SlideInOutAnimation
  ]
})
export class ExpenseComponent implements OnInit, OnDestroy {

  $displayedColumns: string[] = ['select', 'spendDate', 'heading', 'category', 'cost', 'actions'];
  $displayedFooterColumns: string[] = ['select', 'heading', 'category', 'cost'];
  $dataSource: MatTableDataSource<ExpenseItemVM>;
  $selection = new SelectionModel<ExpenseItemVM>(true, []);
  $currentComponent: string = "";
  $sideNavOpen: boolean = true;
  @ViewChild(MatSort) $sort: MatSort;

  private _navBarSubscription: Subscription

  constructor(
    private _dialog: MatDialog,
    private _appNavService: AppNavigationService,
    private _eSvc: ExpenseService,
    private _snackBar: MatSnackBar) {
  }

  refreshView() {
    this._eSvc.getAll().subscribe({
      next: (data: ExpenseItemVM[]) => {
        this.$selection.clear();
        this.$dataSource = new MatTableDataSource(data);
        this.$dataSource.sort = this.$sort;
      },
      error: () => this._snackBar.open("Some error occured!", "Got it :(")
    })
  }

  ngOnInit() {
    this.$sideNavOpen = this._appNavService.appDrawerStatus == "open";
    this._navBarSubscription = this._appNavService.NavBarStatusChanged
      .subscribe((navBarStatus: NavBarStatus) => {
        this.$currentComponent = navBarStatus.activeRoute.title;
      })
    this._appNavService.NavBarOpenStarted.subscribe(() => this.$sideNavOpen = true)
    this._appNavService.NavBarCloseStarted.subscribe(() => this.$sideNavOpen = false)
    this.refreshView();
  }

  ngOnDestroy(): void {
    this._navBarSubscription.unsubscribe();
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

  getTotalExpense() {
    if (!this.$dataSource)
      return 0;
    return this.$dataSource.data.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

  onAdd() {
    const dialogRef = this._dialog.open(ExpenseDialogComponent);

    dialogRef.afterClosed().subscribe((result: ExpenseItem) => {
      if (result) {
        this._eSvc.create(result).subscribe({
          next: () => {
            this._snackBar.open("Expense item created!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }

  onEdit(item: ExpenseItemVM) {
    const dialogRef = this._dialog.open(ExpenseDialogComponent, { data: item });

    dialogRef.afterClosed().subscribe((result: ExpenseItem) => {
      if (result) {
        this._eSvc.update(item.id, result).subscribe({
          next: () => {
            this._snackBar.open("Expense item updated!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }

  onDelete(item: ExpenseItemVM) {
    const dialogRef = this._dialog.open(OkCancelDialogComponent, {
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
        this._eSvc.delete(item.id).subscribe({
          next: () => {
            this._snackBar.open("Expense item deleted!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }

  onDeleteMultiple(items: SelectionModel<ExpenseItemVM>) {
    const dialogRef = this._dialog.open(OkCancelDialogComponent, {
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
        this._eSvc.deleteMany(items.selected.map(item => item.id)).subscribe({
          next: () => {
            this._snackBar.open("Expense items deleted!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }
}
