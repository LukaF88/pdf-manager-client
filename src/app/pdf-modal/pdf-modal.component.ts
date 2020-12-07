import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-pdf-modal',
  templateUrl: './pdf-modal.component.html',
  styleUrls: ['./pdf-modal.component.scss']
})
export class PdfModalComponent {
  blob: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data) {

    this.blob = data;
}

}
