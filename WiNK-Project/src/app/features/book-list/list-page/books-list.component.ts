import {Component} from '@angular/core';
import {CollectionResultModel} from "../../../core/models/collection-result.interface";
import {Volume} from "../../../core/models/volume.interface";
import {SearchParams} from "../../../core/models/search-params.interface";
import {BookApiService} from "../../../core/services/BookApi/book-api.service";
// import {debounceTime, distinctUntilChanged, Observable, Subject, tap} from "rxjs";


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent{
  displayedNumberOfBooks: number | undefined = 0;
  booksCollection: CollectionResultModel<Volume[]> | null = null;
  searchParams: SearchParams | undefined;
  paginationStep: number | undefined = 30;
  //subject : Subject<SearchParams> = new Subject<SearchParams>();

  constructor(private booksApi: BookApiService) {
  }

  getSearchParams(data: SearchParams | null): void {
    if (!data) {
      return;
    }
    this.searchParams = data;
    this.searchParams.startIndex = 0;
    this.loadBooksCollection()
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

  changeNumberOfBooks(numberOfBooks: number | undefined): void {
    this.displayedNumberOfBooks = numberOfBooks;
    this.paginationStep = numberOfBooks;
  }

  private loadBooksCollection(): void {
    if (this.searchParams) {
      this.booksApi.getBooks(this.searchParams)/*.pipe(
        debounceTime(800)
      )*/.subscribe({
          next: (response: any) => {
            if (response) {
              this.booksCollection = response;
            }
          }
        })
    }
  }
  /*private loadBooksCollection2(): void {
    if (this.searchParams) {
      let observableA = Observable.create((observable: { next: (arg0: SearchParams | undefined) => any; complete: () => any; }) =>{
          observable.next(this.searchParams),
          observable.complete()
      }
     )
      observableA.pipe(
        debounceTime(800),
        distinctUntilChanged()
      ).subscribe((params : SearchParams) => {
        this.booksApi.getBooks(params).subscribe(
          (response: any) => {
            if (response) {
              this.booksCollection = response;
            }
          })
        }
      )
    }
  }*/
}
