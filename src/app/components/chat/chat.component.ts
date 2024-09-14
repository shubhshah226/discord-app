import { Component } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;           // Unique identifier for each message
  sender: string;       // Sender of the message
  text: string;         // Text content of the message
  time: string;         // Timestamp for when the message was sent
  edited?: boolean;     // Optional flag indicating if the message was edited
  reaction?: string;    // Optional field for reactions (emoji, etc.)
}
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  message: string = '';
  messages: any[] = [];
  onlineUsers: string[] = [];
  username:string=''
  selectedUser: string | null = null;
  currentUser: string = '';
  constructor(private websocketService: WebSocketService, private router: Router) {}

  ngOnInit() {
    if(localStorage.getItem("userName"))
    {
      let userName=localStorage.getItem("userName");
      this.websocketService.currentUserName=userName?userName:'';
      this.currentUser=userName;
      this.username=userName;
      this.onlineUsers=[];
      this.websocketService.join(this.currentUser);
      this.websocketService.isUserLoggedIn.next(true);
    }
    // Subscribe to the messages from the server
    this.websocketService.getMessages().subscribe((message) => {
      let messages=this.messages.filter((single)=>single.id==message.id)
      if(messages.length>0)
      {
        messages[0].text=message.text;
        messages[0].isEdited=true;
      }
      else{
        this.messages.push(message);
      }

    });

    // Subscribe to the online users list
    this.websocketService.getOnlineUsers().subscribe((users) => {
      this.onlineUsers=[];
      this.onlineUsers = users.filter((single)=>single!=this.currentUser);
    });
    
    //Subscribe to the other then deleted msg List
    this.websocketService.onMessageDeleted().subscribe((messageId: string) => {
      this.messages = this.messages.filter(message => message.id !== messageId);
    });

    //Subscribe Message Reaction
    this.websocketService.onMessageReacted().subscribe((data: { messageId: string, reaction: string }) => {
      const message = this.messages.find(msg => msg.id === data.messageId);
      if (message) {
        message.reaction = data.reaction;
      }
    });
  }
  sendMessage() {
    if (this.message.trim()) {
      const newMessage: Message = {
        id: this.generateId(),    // Generate unique ID for the message
        sender: this.username,
        text: this.message,
        time: this.getCurrentTime(),
      };
      console.log(newMessage);
      // Send message via WebSocket
      this.websocketService.sendMessage(newMessage);
      this.message = ''; // Clear the input after sending
    }
  }
  generateId() {
    return Date.now().toString(); // Using timestamp as a simple unique ID
  }

  logout() {
    this.websocketService.logout(this.username);
    this.router.navigate(['/login']);
  }
  selectUser(user: string) {
    this.selectedUser = user;
    this.messages = []; // Clear chat messages when a new user is selected
  }
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }  
  editMessage(i,message: any) {
    message.isEditMode = true;
    // this.websocketService.editMessage(message);
  }

  deleteMessage(index: number,message) {
    if (confirm("Are you sure you want to delete this message?")) {
      this.messages.splice(index, 1);
      this.websocketService.deleteMessage(message.id)
    }
  }
  saveEdit(message: any) {
    message.isEditMode=false;
    this.websocketService.editMessage(message);
  }

  hoverMessageId: string="";
  setHoverMessage(messageId: string) {
    this.hoverMessageId = messageId;
  }
  RemoveHoverMessage()
  {
    this.hoverMessageId = "";
  }

  reactToMessage(messageId: string, reaction: string) {
    this.websocketService.reactToMessage({ messageId, reaction });
  }

  

}
