import { Component, OnInit } from '@angular/core';
import {RouterModule, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-books',
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [BookService],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {

  title = "book_sorting_app"
  public books: Book[] = []
  book: Book = { title: '', author: '', publishedDate: '', description: '', imageName: '' };

  error = '';
  success = '';
  userName: string = '';

  constructor(private bookService: BookService, private http: HttpClient, private router: Router, public authService: Auth) {

  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('username') || 'Guest';
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getAll().subscribe(
      (data: Book[]) => {
        this.books = data;
        this.success = 'successful list retrieval';
        console.log(this.success);
        console.log(this.books);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteBook(bookID: number): void {
    this.bookService.deleteBook(bookID).subscribe({
      next: () => {
        this.getBooks();
      },
      error: (err) => {
        console.error('Error deleting book:', err);
      }
    });
  }

 editBook(book: Book): void {
  this.router.navigate(['/edit', book.bookID], {
    state: { book: book }
  });
}
}
