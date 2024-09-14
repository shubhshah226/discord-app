import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public isUserLoggedIn=new BehaviorSubject<boolean>(false);
  private socket!: Socket;
  currentUserName:string="";
  constructor(private router:Router) {
    this.socket = io('http://localhost:8080');
  }

  join(username: string) {
    this.socket.emit('join', username);
  }

  sendMessage(message: any) {
    this.socket.emit('message', message);
  }

  logout(username: string) {
    this.socket.emit('logout', username);
    this.router.navigateByUrl("/login");
    localStorage.removeItem("userName");
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (message:any) => {
        observer.next(message);
      });
    });
  }

  getOnlineUsers(): Observable<string[]> {
    return new Observable(observer => {
      this.socket.on('onlineUsers', (users: string[]) => {
        observer.next(users);
      });
    });
  }
  deleteMessage(messageId: any) {
    this.socket.emit('delete-message', messageId);
  }
   editMessage(updatedMessage: any) {
    this.socket.emit('edit-message', updatedMessage);
  }
  onMessageDeleted() {
    return new Observable(observer => {
      this.socket.on('messageDeleted', (messageId: string) => {
        observer.next(messageId);
      });
    });
  }

  reactToMessage(data: { messageId: string, reaction: string }) {
    this.socket.emit('reactToMessage', data);
  }


  onMessageReacted() {
    return new Observable(observer => {
      this.socket.on('messageReacted', (data: { messageId: string, reaction: string }) => {
        observer.next(data);
      });
    });
  }
    
}
