import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { WebSocketService } from '../../../services/web-socket.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';

  constructor(private router: Router, private webSocketService: WebSocketService) {}

  login() {
    if (this.username.trim()) {
      this.webSocketService.join(this.username);
      localStorage.setItem("userName",this.username);
      this.router.navigate(['/chat']);
      this.webSocketService.isUserLoggedIn.next(true);
    }
  }
}
