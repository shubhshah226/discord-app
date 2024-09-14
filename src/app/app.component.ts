import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";

interface Message {
  id: number;
  text: string;
  user: string;
  replies?: Message[];
  reactions?: { [key: string]: number }; // Emoji reactions
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, NavbarComponent, FooterComponent],
  providers:[WebSocketService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'webSocket';
}
