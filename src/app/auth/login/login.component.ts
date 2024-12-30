import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          // Save token and role to localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role); // Assuming role is provided in the response

          // Redirect based on role
          switch (response.role) {
            case 'ADMIN':
              console.log('Redirecting to admin dashboard');
              this.router.navigate(['admin/dashboard']); // Admin dashboard
              break;
            case 'USER':
              this.router.navigate(['/user/profile']); // User profile
              break;
            case 'EMPLOYEE':
              this.router.navigate(['/employee/client-view']); // Employee view
              break;
            default:
              this.router.navigate(['/home']); // Default redirection
              break;
          }

          Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        },
        (error) => {
          console.error('Login failed', error);

          Swal.fire({
            title: 'Error!',
            text: error.error || 'An error occurred during login.',
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Invalid Form',
        text: 'Please fill in the required fields correctly.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
