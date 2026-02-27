import { Router, Routes } from '@angular/router';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/user-functionality/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'tasks', 
    component: TaskDashboardComponent,
    canActivate: [() => inject(AuthService).isLoggedIn() ? true : inject(Router).navigate(['/login'])] 
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
