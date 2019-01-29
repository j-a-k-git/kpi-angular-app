import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface OkCancelDialogConfig {
  title: string;
  message: string;
  okValue: any;
  cancelValue: any;
}

@Component({
  selector: 'ok-cancel-dialog',
  templateUrl: './ok-cancel-dialog.component.html',
  styleUrls: ['./ok-cancel-dialog.component.css']
})
export class OkCancelDialogComponent {

  constructor(private _dialogRef: MatDialogRef<OkCancelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public $data: OkCancelDialogConfig) {
      
  }

}
