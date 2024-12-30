import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { jwtDecode } from "jwt-decode"

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Decode the token to get user information
        const decodedToken : any = jwtDecode(token);

        // Check if the token is expired
        const currentTime = new Date().getTime() / 1000; // Convert to seconds
        if (decodedToken.exp < currentTime) {
          alert('Session expired. Please log in again.');
          this.router.navigate(['/login']);
          return false;
        }
        
        const role = localStorage.getItem('role');
        if (role === 'ADMIN') {
        // Check for the "ROLE_ADMIN" in authorities
          return true; // Allow access for admins
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    // Redirect to home for unauthorized access
    this.router.navigate(['/home']);
    return false;
  }
}
