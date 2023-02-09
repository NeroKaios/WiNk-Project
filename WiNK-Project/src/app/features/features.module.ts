import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookCardModule} from "./book-card/book-card.module";
import {BookSearchModule} from "./book-search/book-search.module";
import {BookListModule} from "./book-list/book-list.module";
import {BookApiService} from "../core/services/BookApi/book-api.service";
import {FeaturesRoutingModule} from "./features-routing.module";



@NgModule({
  declarations: [
  ],
  imports: [
    FeaturesRoutingModule,
    CommonModule,
    BookCardModule,
    BookSearchModule,
    BookListModule,
    BookCardModule
  ],
  exports:[
    BookCardModule,
    BookSearchModule,
    BookListModule,
    BookCardModule
  ],
  providers:[BookApiService]
})
export class FeaturesModule { }
