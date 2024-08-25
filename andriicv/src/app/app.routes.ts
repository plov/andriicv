import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FullDescriptionComponent } from './full-descript/full-description/full-description.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminComponent } from './admin/admin/admin.component';

export const routes: Routes = [
    {path: '', redirectTo: '/app-main-page', pathMatch: 'full' },
    {path: 'app-main-page', component: MainPageComponent}, 
    {path: 'app-full-description', component: FullDescriptionComponent},
    {path: 'app-admin', component: AdminComponent}
];
