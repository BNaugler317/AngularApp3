import {Injectable } from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root',
})

export class BookService {
  baseUrl = 'http://localhost/AngularApp3API';

  constructor(private http: HttpClient) {
    // no statements needed
  }
  getAll() {
    return this.http.get(`${this.baseUrl}/list`).pipe(
      map((res: any) => {
        return res['data'];
      })
    )
  }
  
  add(book: Book) {
    return this.http.post(`${this.baseUrl}/add`, {data: book}).pipe(
      map((res: any) => {
        return res['data'];
      })
    )
  }

  deleteBook(bookID: number) {
    const url = this.baseUrl + '/delete.php';

    const body = {
      data: {
        bookID: bookID
      }
    };

    return this.http.post(url, body);
  }

   getBook(bookID: number) {
    return this.http.get<Book>(`${this.baseUrl}/get.php?bookID=${bookID}`);
  }

  updateBook(book: Book) {
    const url = this.baseUrl + '/update.php';
    const body = {
      data: book
    };
    return this.http.post<Book>(url, body);
  }
}
