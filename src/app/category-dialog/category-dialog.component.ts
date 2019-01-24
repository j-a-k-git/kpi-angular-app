import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

export interface CategoryItem {
  title: string,
  description: string
}

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  $categoryForm: FormGroup;

  get title(): any { return this.$categoryForm.get('title'); }
  get amount(): any { return this.$categoryForm.get('amount'); }
  get categoryId(): any { return this.$categoryForm.get('categoryId'); }
  get date(): any { return this.$categoryForm.get('date'); }
  get description(): any { return this.$categoryForm.get('description'); }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private categoryItem: CategoryItem) {
  }

  ngOnInit(): void {
    this.$categoryForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    if (this.categoryItem) {
      this.$categoryForm.patchValue(this.categoryItem)
    }
  }

  onSave() {
    this.$categoryForm.updateValueAndValidity();
    if (this.$categoryForm.valid) {
      console.warn(this.$categoryForm.value);
      this.dialogRef.close(this.$categoryForm.value);
    }
  }

}