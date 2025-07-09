import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        const role = this.authService.getUserRole();
        if (role === 'admin') {
          this.router.navigate(['/servicios']);
        } else if (role === 'user') {
          this.router.navigate(['/clientes']);
        } else {
          this.error = 'Unknown role';
        }
      },
      error: () => {
        this.error = 'Invalid credentials';
      }
    });
  }
}
