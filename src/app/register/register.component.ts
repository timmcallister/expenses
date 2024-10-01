import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';
  registrationError = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: (Response) => {
        if (Response.success) {
          alert('Registration successful! Please log in.');
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error(error);
        this.registrationError = 'Registration failed. Please try again.';
      }
    });
  }
}
