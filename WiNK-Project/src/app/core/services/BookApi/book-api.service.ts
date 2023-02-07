import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Book} from "../../models/Book";

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }

  private API = 'https://www.googleapis.com/books/v1/volumes';
  search(query: string): Observable<Book[]> {
    return this.http
      .get<{ items: Book[] }>(`${this.API}?q=${query}`)
      .pipe(map(books => books.items || []));
  }
  getById(volumeId: string): Observable<Book> {
    return this.http.get<Book>(`${this.API}/${volumeId}`);
  }
}
