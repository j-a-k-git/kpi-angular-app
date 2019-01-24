import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DateValidators } from '../validators/DateValidators';

export interface ExpenseItem {
  title: string,
  amount: Number,
  categoryId: Number,
  date: Date,
  description: string
}

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  $expenseForm: FormGroup;

  get title(): any { return this.$expenseForm.get('title'); }
  get amount(): any { return this.$expenseForm.get('amount'); }
  get categoryId(): any { return this.$expenseForm.get('categoryId'); }
  get date(): any { return this.$expenseForm.get('date'); }
  get description(): any { return this.$expenseForm.get('description'); }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private expenseItem: ExpenseItem) {
  }

  ngOnInit(): void {
    this.$expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required],
      date: ['', [DateValidators.valid]],
      description: [''],
    });

    if (this.expenseItem) {
      this.$expenseForm.patchValue(this.expenseItem)
    }
  }

  onSave() {
    this.$expenseForm.updateValueAndValidity();
    if (this.$expenseForm.valid) {
      console.warn(this.$expenseForm.value);
      this.dialogRef.close(this.$expenseForm.value);
    }
  }
}
