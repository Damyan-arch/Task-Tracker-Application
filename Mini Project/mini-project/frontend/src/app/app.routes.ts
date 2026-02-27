import { Router, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'tasks', 
    component: TaskDashboardComponent,
    canActivate: [() => inject(AuthService).isLoggedIn() ? true : inject(Router).navigate(['/login'])] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
