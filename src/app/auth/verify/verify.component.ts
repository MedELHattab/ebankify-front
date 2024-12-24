import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Include required modules
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  verifyForm: FormGroup;
  isLoading = false; // To handle loading state
  successMessage = ''; // To display success messages
  errorMessage = ''; // To display error messages
  private verifyEndpoint = 'http://localhost:8082/auth/verify'; // Backend endpoint for verification

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.verifyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      verificationCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.verifyForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      // API call to verify the email and code
      this.http.post(this.verifyEndpoint, this.verifyForm.value, { responseType: 'text' }).subscribe(
        (response: string) => {
          this.isLoading = false;
          this.successMessage = response; // Use the plain text response
          setTimeout(() => {
            this.router.navigate(['/login']); // Redirect to login page after successful verification
          }, 2000);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Verification failed. Please try again.';
          console.error('Error during verification:', error);
        }
      );
    }
  }
}  