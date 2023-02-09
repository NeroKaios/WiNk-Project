import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooksSearchComponent} from "./books-search.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    BooksSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    BooksSearchComponent
  ]
})
export class BookSearchModule { }
