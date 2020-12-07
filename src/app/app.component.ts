import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { UploadFileService } from './services/upload-file.service';
import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';

export interface FileElement {
  name: string;
  lastModified: Date;
  size: number;
  loading: number;
  thumb: SafeResourceUrl;
}

export interface FileServer {
  filename: string;
  thumbBase64: string;
  lastModified: Date;
  size: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  files: FileElement[] = [];

  constructor(private uploadService: UploadFileService, private sanitizer: DomSanitizer, private _snackBar: MatSnackBar, private dialog: MatDialog) {}
    
  ngAfterViewInit() {
    this.retrieveData();
  }
  prova(){
    this.uploadService.exception().subscribe((data: any[])=>{
    }, (error: any) => {
        this.openSnackBar(error.message, "Error");
    } );
  }

  retrieveData(){
    this.uploadService.getFiles().subscribe((data: any[])=>{
      this.files.splice(0,this.files.length)
      var documents: FileServer[];
      documents = data["documents"];
      documents.forEach((element: FileServer) => {
        const fileServer: FileElement = {
          lastModified: element.lastModified,
          thumb : this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ` + element.thumbBase64),
          loading: 100,
          size: element.size,
          name: element.filename
        };
        
        this.files.push(fileServer); 
      });
    }, (error: any) => {
        this.openSnackBar(error.message, "Error");
    } );
  }

  receiveMessage($event){
    this.retrieveData();
  }

  /// DRAG AND DROP
    onFileDropped($event) {
      this.prepareFilesList($event);
    }

    fileBrowseHandler(files) {
      this.prepareFilesList(files);
    }
  //////


    prepareFilesList(files: Array<any>) {
      const FILENAME_LIMIT = 30;
      let fileCounter = files.length;
      let validatedFiles = Array.from(files).filter(el => {
        return (el['name'].length < FILENAME_LIMIT) && el['type'] == 'application/pdf';
      });

      if (files.length !== validatedFiles.length)
        this.openSnackBar('Alcuni file non verranno caricati perchè il tipo non è corretto o il nome eccede la lunghezza massima di ' + FILENAME_LIMIT + ' caratteri', 'ERROR');

      for (const item of validatedFiles) {

      // check overwrite
      let alreadyPresent = this.files.filter(el => {
        return (el.name == item['name']);
      }).length > 0;

      if (alreadyPresent) {
          this.openConfirmOverwrite(item).afterClosed().subscribe(result => {
            if (result == 'OK')
              this.startUpload(item, fileCounter);
              }, (error: any) => {
                this.openSnackBar(error.message, "Error");
            });
      }
      else
        this.startUpload(item, fileCounter);
      }
    }


    startUpload(item: any, fileCounter: number){
      const file: FileElement = {name: item.name, lastModified: new Date(), loading: 0, thumb: '', size: item.size};
      this.files.push(file);
      this.uploadService.upload(item).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            file.loading = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            fileCounter--;
            if (fileCounter == 0)
              this.retrieveData();
          }
        },
        err => {
          fileCounter--;
          if (fileCounter == 0)
              this.retrieveData();
          file.loading = -1;
            this.openSnackBar(err.message, "Error");
        });
    }

    openSnackBar(message: string, type: string) {
      this._snackBar.open(message, type, {
        duration: 10 * 1000,
      });
    }

    openConfirmOverwrite(element: any) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.minWidth = '10vw';
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        message: 'Il file ' + element["name"] + ' è già presente, Sei sicuro di volerlo sovrascrivere?',
        buttonOk: 'Sovrascrivi',
        buttonDismiss: 'Annulla'
      } 
    
      return this.dialog.open(ConfirmComponent, dialogConfig)

    }

}
