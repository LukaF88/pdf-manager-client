import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  buttonOk: string;
  buttonDismiss: string;
  message: string;

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 
      this.message = data.message;
      this.buttonOk = data.buttonOk;
      this.buttonDismiss = data.buttonDismiss;
    }

  close () {
    this.dialogRef.close('OK');
  }

  dismiss () {
    this.dialogRef.close('CANCEL');
  }

}
