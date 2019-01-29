import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';
import { OkCancelDialogComponent } from '../ok-cancel-dialog/ok-cancel-dialog.component';
import { AppNavigationService, NavBarStatus } from '../services/app-navigation/app-navigation.service';
import { CategoryItem, CategoryService, CategoryItemVM } from 'xpense-api';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { SlideInOutAnimation } from '../animations/slide-in-out-animation';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    SlideInOutAnimation
  ]
})
export class CategoriesComponent implements OnInit, OnDestroy {

  $displayedColumns: string[] = ['select', 'label', 'description', 'updatedOn', 'actions'];
  $dataSource: MatTableDataSource<CategoryItemVM>;
  $selection = new SelectionModel<CategoryItemVM>(true, []);
  $currentComponent: string = "";
  $sideNavOpen: boolean = true;
  @ViewChild(MatSort) $sort: MatSort;

  private _navBarSubscription: Subscription

  constructor(
    private _dialog: MatDialog,
    private _appNavService: AppNavigationService,
    private _cSvc: CategoryService,
    private _snackBar: MatSnackBar) {
  }

  refreshView() {
    this._cSvc.getAll().subscribe({
      next: (data: CategoryItemVM[]) => {
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

  onAdd() {
    const dialogRef = this._dialog.open(CategoryDialogComponent);

    dialogRef.afterClosed().subscribe((result: CategoryItem) => {
      if (result) {
        this._cSvc.create(result).subscribe({
          next: () => {
            this._snackBar.open("Category item created!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }

  onEdit(item: CategoryItemVM) {
    const dialogRef = this._dialog.open(CategoryDialogComponent, { data: item });

    dialogRef.afterClosed().subscribe((result: CategoryItem) => {
      if (result) {
        this._cSvc.update(item.id, result).subscribe({
          next: () => {
            this._snackBar.open("Category item updated!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: () => this._snackBar.open("Some error occured!", "Got it :(")
        })
      }
    });
  }

  onDelete(item: CategoryItemVM) {
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
        this._cSvc.delete(item.id).subscribe({
          next: () => {
            this._snackBar.open("Category item deleted!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 406)
              this._snackBar.open("Category item in use, cannot be deleted!", "I understand");
            else
              this._snackBar.open("Some error occured!", "Got it :(")
          }
        })
      }
    });
  }

  onDeleteMultiple(items: SelectionModel<CategoryItemVM>) {
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
        this._cSvc.deleteMany(items.selected.map(item => item.id)).subscribe({
          next: () => {
            this._snackBar.open("Category items deleted!", "Okay", { duration: 2000, });
            this.refreshView();
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 406)
              this._snackBar.open("Category item(s) in use, cannot be deleted!", "I understand");
            else
              this._snackBar.open("Some error occured!", "Got it :(")
          }
        })
      }
    });
  }

}
