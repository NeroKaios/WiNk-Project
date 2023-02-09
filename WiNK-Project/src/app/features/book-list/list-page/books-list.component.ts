import { Component } from '@angular/core';
import {CollectionResultModel} from "../../../core/models/collection-result.interface";
import {Volume} from "../../../core/models/volume.interface";
import {SearchParams} from "../../../core/models/search-params.interface";
import {BookApiService} from "../../../core/services/BookApi/book-api.service";


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent {
  booksCollection: CollectionResultModel<Volume[]> | null = null;
  searchParams: SearchParams | null = null;
  paginationStep = 30;

  constructor(
    private booksApi: BookApiService,
  ) {}

  getSearchParams(data: SearchParams | null): void {
    if (!data) {
      return;
    }
    this.searchParams = data;
    this.searchParams.startIndex = 0;
    this.loadBooksCollection();
  }

  onPreviousPageClick(): void {
    if (!this.searchParams) {
      return;
    }

    if (this.searchParams.startIndex > 0) {
      this.searchParams.startIndex -= this.paginationStep;
      this.loadBooksCollection();
    }
  }

  onNextPageClick(): void {
    if (!this.searchParams || !this.booksCollection?.totalItems) {
      return;
    }

    if (
      this.searchParams.startIndex <
      this.booksCollection.totalItems - this.paginationStep
    ) {
      this.searchParams.startIndex += this.paginationStep;
      this.loadBooksCollection();
    }
  }

  private loadBooksCollection(): void {
    if (!this.searchParams) {
      return;
    }
    this.booksApi.getBooks(this.searchParams).subscribe({
      next: (response: any) => {
        if (response) {
          this.booksCollection = response;
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
