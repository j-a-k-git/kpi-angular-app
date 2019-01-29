import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CategoryItemVM, CategoryItem } from 'xpense-api';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  $categoryForm: FormGroup;

  get label(): any { return this.$categoryForm.get('label'); }
  get description(): any { return this.$categoryForm.get('description'); }

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _categoryItem: CategoryItemVM) {
  }

  ngOnInit(): void {
    this.$categoryForm = this._fb.group({
      label: ['', Validators.required],
      description: [''],
    });

    if (this._categoryItem) {
      this.$categoryForm.patchValue(this._categoryItem)
    }
  }

  onSave() {
    this.$categoryForm.updateValueAndValidity();
    if (this.$categoryForm.valid) {
      this._dialogRef.close(CategoryItem.from(this.$categoryForm.value));
    }
  }

}