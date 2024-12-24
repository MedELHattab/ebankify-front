import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import required modules
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false; // For loading state
  showSuccessPopup = false; // Controls success popup visibility

  private registerEndpoint = 'http://localhost:8082/auth/signup'; // Backend endpoint

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      monthlyIncome: ['', [Validators.required, Validators.min(0)]],
      creditScore: ['', [Validators.required, Validators.min(300), Validators.max(850)]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true; // Show loading state
      this.http.post(this.registerEndpoint, this.registerForm.value).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.showSuccessPopup = true; // Show success popup

          // Redirect after a short delay
          setTimeout(() => {
            this.router.navigate(['/auth/verify']); // Replace with your actual verify page route
          }, 2000);
        },
        (error) => {
          this.isLoading = false;
          console.error('Registration failed', error);
        }
      );
    }
  }

  closePopup() {
    this.showSuccessPopup = false; // Hide popup
  }
}
