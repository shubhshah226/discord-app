import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../../services/web-socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn:boolean=false;
  userName:string="";
  constructor(private webSocketService:WebSocketService,private router:Router)
  {

  }
  ngOnInit(): void {
    if(localStorage.getItem("userName"))
    {
      this.isUserLoggedIn=true;
      this.userName=localStorage.getItem("userName");
    }
    else{
      this.isUserLoggedIn=false;
    }
    this.webSocketService.isUserLoggedIn.subscribe((res)=>{
      this.isUserLoggedIn=res;
    })
  }
  logOut()
  {
    this.webSocketService.logout(this.webSocketService.currentUserName);
    this.webSocketService.currentUserName="";
    this.isUserLoggedIn=false;
    this.router.navigateByUrl('login');
  }
}
