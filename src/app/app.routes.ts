import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { EditbooksComponent } from './editbooks/editbooks.component';

export const routes: Routes = [
  { path: "books", component: BooksComponent },
  { path: "add", component: AddbooksComponent },
  { path: "edit/:bookID", component: EditbooksComponent },
  { path: "**", redirectTo: "/books", pathMatch: "full" }
];
