import { Routes } from '@angular/router';
import { LoginformComponent } from './loginform/loginform.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path: 'app-root', component: AppComponent}, 
    {path: 'app-loginform', component: LoginformComponent}, 
    {path: 'app-header', component: HeaderComponent},
];
