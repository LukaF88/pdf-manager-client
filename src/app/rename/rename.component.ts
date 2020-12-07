import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.scss']
})
export class RenameComponent implements OnInit {
  oldName: string;
  newName: string;
  
  constructor(public dialogRef: MatDialogRef<RenameComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.newName = '';
    this.oldName = data;
}

save () {
  this.dialogRef.close(this.newName);
}


  ngOnInit() {
  }

}
