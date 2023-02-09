import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookDetailComponent} from "./detail-page/book-detail.component";
import {BookDetailContentComponent} from "./detail-content/book-detail-content.component";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    BookDetailComponent,
    BookDetailContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    BookDetailComponent,
    BookDetailContentComponent
  ]
})
export class BookDetailsModule { }
