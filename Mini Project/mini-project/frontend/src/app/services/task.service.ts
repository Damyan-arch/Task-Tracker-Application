import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // Replace with your NestJS server URL
  private apiUrl = 'http://localhost:3000/tasks'; 

  constructor(private http: HttpClient) {}

  // Calls NestJS: @Get() getTasks()
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Calls NestJS: @Post() createTask()
  addTask(task: Omit<Task, 'id'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Calls NestJS: @Patch(':id') updateTask()
  updateTask(updatedTask: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask);
  }

  // Calls NestJS: @Delete(':id') deleteTask()
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}