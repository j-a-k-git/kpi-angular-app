import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DateValidators } from '../validators/DateValidators';
import { ExpenseItem, ExpenseItemVM, CategoryService, CategoryItemVM } from 'xpense-api';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  $expenseForm: FormGroup;
  $categories: CategoryItemVM[];

  get heading(): any { return this.$expenseForm.get('heading'); }
  get cost(): any { return this.$expenseForm.get('cost'); }
  get categoryId(): any { return this.$expenseForm.get('categoryId'); }
  get spendDate(): any { return this.$expenseForm.get('spendDate'); }
  get notes(): any { return this.$expenseForm.get('notes'); }

  constructor(
    private _fb: FormBuilder,
    private _cSvc: CategoryService,
    private _dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _expenseItem: ExpenseItemVM) {
  }

  ngOnInit(): void {
    this.$expenseForm = this._fb.group({
      heading: ['', Validators.required],
      cost: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      spendDate: ['', [DateValidators.valid]],
      notes: [''],
    });

    this._cSvc.getAll().subscribe((data: CategoryItemVM[]) => {
      this.$categories = data;
    })

    if (this._expenseItem) {
      this.$expenseForm.patchValue(this._expenseItem)
      this.$expenseForm.patchValue({
        spendDate: new Date(this._expenseItem.spendDate),
        categoryId: this._expenseItem.category.id
      });
    }
  }

  onSave() {
    this.$expenseForm.updateValueAndValidity();
    if (this.$expenseForm.valid) {
      this._dialogRef.close(ExpenseItem.from(this.$expenseForm.value));
    }
  }
}
