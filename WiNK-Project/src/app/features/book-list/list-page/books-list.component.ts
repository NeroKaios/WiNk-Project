import {Component, Input} from '@angular/core';
import {CollectionResultModel} from "../../../core/models/collection-result.interface";
import {Volume} from "../../../core/models/volume.interface";
import {SearchParams} from "../../../core/models/search-params.interface";
import {BookApiService} from "../../../core/services/BookApi/book-api.service";
import {debounceTime} from "rxjs";


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  displayedNumberOfBooks : number | undefined = 0;
  booksCollection: CollectionResultModel<Volume[]> | null = null;
  searchParams: SearchParams | null = null;
  paginationStep: number | undefined = 30;

  constructor(private booksApi: BookApiService) {
  }

  getSearchParams(data: SearchParams | null): void {
    if (!data) {
      return;
    }
    this.searchParams = data;
    this.searchParams.startIndex = 0;
    this.loadBooksCollection();
    console.log(this.displayedNumberOfBooks)
  }

  onPreviousPageClick(): void {
    window.scrollTo(0, 0);
    if (!this.searchParams) {
      return;
    }

    if (this.searchParams.startIndex > 0) {
      this.searchParams.startIndex -= this.paginationStep!;
      this.loadBooksCollection();
    }
  }

  onNextPageClick(): void {
    window.scrollTo(0, 0);
    if (!this.searchParams || !this.booksCollection?.totalItems) {
      return;
    }

    if (
      this.searchParams.startIndex <
      this.booksCollection.totalItems - this.paginationStep!
    ) {
      this.searchParams.startIndex += this.paginationStep!;
      this.loadBooksCollection();
    }
  }

  changeNumberOfBooks(numberOfBooks: number | undefined):void{
    this.displayedNumberOfBooks = numberOfBooks;
    this.paginationStep = numberOfBooks;
  }


  private loadBooksCollection(): void {
    if (this.searchParams) {
      this.booksApi.getBooks(this.searchParams).pipe(
        debounceTime(800)
      )
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.booksCollection = response;
            }
            console.log("loadBooks")
          }
        })
    }
  }
}
