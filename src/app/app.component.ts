import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from '../services/web-socket.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./components/navbar/navbar.component";

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
  imports: [RouterOutlet, FormsModule, CommonModule, NavbarComponent],
  providers:[WebSocketService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'webSocket';
  // public message: string="";
  // public messages: string[] = [];

  // constructor(private websocketService: WebSocketService) {}

  // ngOnInit(): void {
  //   this.websocketService.messages.subscribe((message: string) => {
  //     this.messages.push(message);
  //   });
  // }

  // sendMessage(): void {
  //   if (this.message) {
  //     this.websocketService.sendMessage(this.message);
  //     this.message = '';
  //   }
  // }
  public messages: any= [];
  public messageText: string = '';
  private nextId: number = 1;

  constructor(private websocketService: WebSocketService) {}

  ngOnInit(): void {
    // this.websocketService.messages.subscribe((message: Message) => {
    //   this.messages.push(message);
    // });
  }

  // sendMessage(): void {
  //   if (this.messageText.trim()) {
  //     const message: Message = {
  //       id: this.nextId++,
  //       text: this.messageText,
  //       user: 'User', // Replace with actual user info
  //       replies: [],
  //       reactions: {}
  //     };
  //     this.websocketService.sendMessage(message);
  //     this.messageText = '';
  //   }
  // }

  // replyToMessage(message: any, replyText: string): void {
  //   const reply: Message = { id: this.nextId++, text: replyText, user: 'User', replies: [] };
  //   message.replies.push(reply);
  //   this.websocketService.sendMessage(message);
  // }

  // editMessage(message: Message, newText: string): void {
  //   message.text = newText;
  //   this.websocketService.sendMessage(message);
  // }

  // deleteMessage(message: Message): void {
  //   this.messages = this.messages.filter((m:any) => m.id !== message.id);
  //   this.websocketService.sendMessage({ ...message, deleted: true });
  // }

  // reactToMessage(message: any, emoji: string): void {
  //   message.reactions[emoji] = (message.reactions[emoji] || 0) + 1;
  //   this.websocketService.sendMessage(message);
  // }
}
