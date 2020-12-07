import { IterableDiffers } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PdfModalComponent } from '../pdf-modal/pdf-modal.component';
import { FileElement } from '../app.component';
import {MatDialog, MatDialogConfig, MatSnackBar, MatSort, MatTableDataSource} from "@angular/material";
import { UploadFileService } from '../services/upload-file.service';
import { RenameComponent } from '../rename/rename.component';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-pdf-list',
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.scss']
})
export class PdfListComponent{
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  iterableDiffer: any;
  dataSource: any;

  @Output() messageEvent = new EventEmitter<string>();

  @Input()
  get files(): FileElement[] { return this._files; }
  set files(files: FileElement[]) {
    this._files = files;
  }
  private _files = [];
  selectedValue = 'list';

  constructor(private iterableDiffers: IterableDiffers, private dialog: MatDialog, private uploadService: UploadFileService, private _snackBar: MatSnackBar) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    this.dataSource = new MatTableDataSource<FileElement>();
    this.dataSource.data = this._files;
    this.dataSource.sort = this.sort;
}

sendMessage(message: string){
  this.messageEvent.emit(message);
}

ngDoCheck() {
  let changes = this.iterableDiffer.diff(this._files);
  if (changes) {
      this.dataSource.data = this._files;
      this.dataSource.sort = this.sort;
  }
}

displayedColumns: string[] = ['name', 'lastModified', 'size', 'loading'];

formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

openRenamer(element: any) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.minWidth = '10vw';
  dialogConfig.autoFocus = true;
  dialogConfig.data = element["name"]; 

  this.dialog.open(RenameComponent, dialogConfig).afterClosed().subscribe(result => {
    if (result)
      this.uploadService.update(element["name"], result+'.pdf').subscribe(response => {
        this.sendMessage("refresh");
      });
  }, (error: any) => {
    this._snackBar.open(error.message, "Error", {duration: 10 * 1000}); 
});
}

openConfirmDelete(element: any) {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.minWidth = '10vw';
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
    message: 'Sei sicuro di voler eliminare ' + element["name"] + '?',
    buttonOk: 'Elimina',
    buttonDismiss: 'Annulla'
  } 

  this.dialog.open(ConfirmComponent, dialogConfig).afterClosed().subscribe(result => {
    if (result == 'OK')
      this.uploadService.delete(element["name"]).subscribe(response => {
        this.sendMessage("refresh");
      }, (error: any) => {
        this._snackBar.open(error.message, "Error", {duration: 10 * 1000}); 
    });
  });
}

openViewer(element: any) {
this.uploadService.download(element["name"]).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf'});
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.minWidth = '75vw';
    dialogConfig.autoFocus = true;
    dialogConfig.data = blob; 
    this.dialog.open(PdfModalComponent, dialogConfig);
  }, (error: any) => {
    this._snackBar.open(error.message, "Error", {duration: 10 * 1000}); 
});
}

download(element: any) {
  this.uploadService.downloadAndOpenDefault(element["name"]);
}

}
