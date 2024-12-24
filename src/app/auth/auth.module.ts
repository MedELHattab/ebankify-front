import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component'; // Import LoginComponent
import { RegisterComponent } from './register/register.component'; // Import RegisterComponent
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';


@NgModule({
  imports: [
    CommonModule,           // Provides Angular directives like ngIf, ngFor
    AuthRoutingModule,      // Import routing for AuthModule
    ReactiveFormsModule,    // Import ReactiveFormsModule for form handling
    LoginComponent,         // Import LoginComponent
    HttpClientModule,
    RegisterComponent       // Import RegisterComponent
  ],
  providers: [AuthService], 
})
export class AuthModule {}
