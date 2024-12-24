import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Ensure correct path to AuthService

@Component({
  selector: 'app-login',
  standalone: true, // Ensure this is set if the component is standalone
  imports: [CommonModule, ReactiveFormsModule], // Add these imports here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {  // Inject AuthService here
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // Add required validators
      password: ['', [Validators.required, Validators.minLength(6)]],  // Add minLength validator
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          // Handle the response (store the token, etc.)
          console.log('Login successful', response);
          // Store the token in localStorage or do other actions as needed
          localStorage.setItem('authToken', response.token);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }
}