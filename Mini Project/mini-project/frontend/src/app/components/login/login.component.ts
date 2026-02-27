import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Data for the Front of the card (Login)
  loginData = { username: '', password: '' };
  loginError = '';

  // Data for the Back of the card (Register)
  regData = { username: '', password: '' };
  regError = '';
  regSuccess = '';

  // Use a variable to control the flip state programmatically if needed
  isFlipped = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.loginError = '';
    this.authService.signIn(this.loginData).subscribe({
      next: () => {
        this.router.navigate(['/tasks']); // Go to dashboard on success
      },
      error: (err) => {
        this.loginError = 'Invalid username or password';
      }
    });
  }

  onRegister() {
    this.regError = '';
    this.regSuccess = '';
    this.authService.signUp(this.regData).subscribe({
      next: () => {
        this.regSuccess = 'Success! Please flip back to Log in.';
        this.regData = { username: '', password: '' }; // Clear the form
        this.isFlipped = false;
      },
      error: (err) => {
        this.regError = err.error?.message || 'Registration failed.';
      }
    });
  }
}