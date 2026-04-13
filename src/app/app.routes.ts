import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AddbooksComponent } from './addbooks/addbooks.component';
import { EditbooksComponent } from './editbooks/editbooks.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: "books", component: BooksComponent, canActivate: [authGuard] },
  { path: "add", component: AddbooksComponent, canActivate: [authGuard]  },
  { path: "edit/:bookID", component: EditbooksComponent, canActivate: [authGuard]  },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", redirectTo: "/books", pathMatch: "full" }
];
