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
}