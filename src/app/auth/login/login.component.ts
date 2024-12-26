import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

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
          // Handle successful login
          console.log('Login successful', response);
          localStorage.setItem('authToken', response.token); // Save token to localStorage

          Swal.fire({
            title: 'Success!',
            text: 'You have logged in successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/dashboard']); // Redirect to dashboard
          });
        },
        (error) => {
          // Handle login failure
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
