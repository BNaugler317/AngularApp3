import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { Book } from '../book';
import { BookService } from '../book.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-addbooks',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './addbooks.component.html',
  styleUrl: './addbooks.component.css',
  providers: [BookService]
})
export class AddbooksComponent implements OnInit {

  book: Book = { title: '', author: '', publishedDate: '', description: '' };

  error = '';
  success = '';

  constructor(
    private bookService: BookService,
    private http: HttpClient,
    private router: Router
  )
  {

  }

  ngOnInit(): void {

  }

  addBook(f: NgForm) {
    this.resetAlerts();

    this.bookService.add(this.book).subscribe(
      (res: Book) => {
        this.success = 'Successfully created';

        f.reset();
        this.router.navigate(['/books']);
      },
      (err) => {
        this.error = err.error?.message || err.message || 'Error occurred';
      }
    )
  }

  resetAlerts(): void {
    this.error = '';
    this.success = '';
  }




}
