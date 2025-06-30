import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html'
})
export class LoginPage {
  private readonly authService = inject(AuthService);

  login() {
    this.authService.login();
  }
} 