import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userName = '';
  password = '';
  confirmPassword = '';
  emailAddress = '';
  errorMessage = '';
  successMessage = '';

  constructor(private auth: Auth, private router: Router) {

  }

  register(form: NgForm) {

    if (this.password != this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (form.invalid) {
      return;
    }

    this.auth.register({ userName: this.userName, password: this.password, emailAddress: this.emailAddress})
      .subscribe({
        next: res => {
          this.successMessage = 'Registration successful! You can now log in.';
          this.router.navigate(['/login']);
        },
        error: err => {
          this.errorMessage = err.error?.message || 'registration failed.';
        }
      });



  }

}
