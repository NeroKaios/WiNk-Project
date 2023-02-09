import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {SearchParams} from "../../models/search-params.interface";
import {Volume} from "../../models/volume.interface";
import {HttpClient} from "@angular/common/http";
import {CollectionResultModel} from "../../models/collection-result.interface";

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }

  private url = 'https://www.googleapis.com/books/v1/volumes';
  public getBooks(
    searchParams: SearchParams
  ): Observable<CollectionResultModel<Volume[]>> {
    return this.http.get<CollectionResultModel<Volume[]>>(this.url, {
      params: {
        q: searchParams.searchTerm,
        subject: searchParams.category,
        orderBy: searchParams.orderBy ? searchParams.orderBy : 'relevance',
        startIndex: searchParams.startIndex,
        maxResults: 30,
      },
    });
  }
  public getBook(bookId: string): Observable<Volume> {
    return this.http.get<Volume>(`${this.url}/${bookId}`);
  }
}
