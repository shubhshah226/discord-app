import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent        
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'chat',
        component:ChatComponent,
        canActivate: [authGuard],
    }
];
