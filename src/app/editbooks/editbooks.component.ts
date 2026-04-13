import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-editbooks',
  imports: [CommonModule, FormsModule, RouterModule,HttpClientModule],
  providers: [BookService],
  templateUrl: './editbooks.component.html',
  styleUrl: './editbooks.component.css'
})
export class EditbooksComponent implements OnInit {

  book: Book = {
    bookID: 0,
    title: '',
    author: '',
    publishedDate: '',
    description: ''
  };

  error = '';
  success = '';
  userName: string = '';

  constructor( private bookService: BookService, private router: Router, public authService: Auth) {}

  ngOnInit(): void {
    
    if (history.state.book) {
      this.book = history.state.book;
    } else {
      this.error = 'No book data found.';
      this.router.navigate(['/books']);
    }

    this.userName = localStorage.getItem('username') || 'Guest';
  }

  updateBook(form: NgForm): void {
    this.bookService.updateBook(this.book).subscribe({
      next: () => {
        this.success = 'Book updated successfully.';
        this.router.navigate(['/books']);
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.error = 'Update failed.';
      }
    });
  }
  

}
