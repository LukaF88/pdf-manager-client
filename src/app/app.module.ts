import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDialogModule} from "@angular/material";
import { PdfModalComponent } from './pdf-modal/pdf-modal.component';
import { PdfListComponent } from './pdf-list/pdf-list.component';


import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatSortModule  } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DndDirective } from './direcitves/dnd.directive';
import {MatIconModule} from '@angular/material/icon';
import { RenameComponent } from './rename/rename.component';
import { MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ConfirmComponent } from './confirm/confirm.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    PdfModalComponent,
    PdfListComponent,
    DndDirective,
    RenameComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSortModule,
    HttpClientModule,
    MatGridListModule,
    NgxExtendedPdfViewerModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PdfModalComponent, RenameComponent, ConfirmComponent]
})
export class AppModule { }
