import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

export const routes: Routes = [
    {path: '', redirectTo: '/app-main-page', pathMatch: 'full' },
    {path: 'app-main-page', component: MainPageComponent}, 
    {path: 'login', component: SignUpComponent},
];
