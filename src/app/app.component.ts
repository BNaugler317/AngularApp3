import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Book } from './book';
import { BookService} from './book.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularApp3';
}
