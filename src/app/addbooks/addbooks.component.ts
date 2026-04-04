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

  book: Book = { title: '', author: '', publishedDate: '', description: '', imageName: '' };

  selectedFile: File | null = null;
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

    if (!this.book.imageName) {
      this.book.imageName = 'placeholder.jpg';
    }

    this.bookService.add(this.book).subscribe(
      (res: Book) => {
        this.success = 'Successfully created';

        if (this.selectedFile && this.book.imageName != 'placeholder.jpg') {
          this.uploadFile();
        }

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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.book.imageName = this.selectedFile.name;
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost/AngularApp3API/upload', formData).subscribe(
      response => console.log('File uploaded successfully', response),
      error => console.error('file upload failed', error)
    );

  }




}
