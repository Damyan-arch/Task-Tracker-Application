import { Component, OnInit } from '@angular/core'; // Added OnInit
import { TaskService } from '../../services/task.service';
import { Task } from '../../interface/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  tasks: Task[] = [];
  filter: string = 'all';

  newTask: Omit<Task, 'id'> = {
    title: '',
    description: '',
    completed: false,
    dueDate: ''
  };

  editMode: boolean = false;
  editingTaskId: number | null = null;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  // Triggered when the component loads
  ngOnInit() {
    this.loadTasks();
  }

  // Helper to refresh the list from the database
  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addOrUpdateTask() {
    if (this.editMode && this.editingTaskId !== null) {
      // Update existing task in DB
      this.taskService.updateTask({
        id: this.editingTaskId,
        ...this.newTask
      } as Task).subscribe(() => {
        this.loadTasks(); // Refresh list after update
        this.resetEditState();
      });
    } else {
      // Add new task to DB
      this.taskService.addTask(this.newTask).subscribe(() => {
        this.loadTasks(); // Refresh list after adding
        this.resetForm();
      });
    }
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.editMode = true;
    this.editingTaskId = task.id;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks(); // Refresh list after deletion
    });
  }

  toggleComplete(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks(); // Refresh list after toggle
    });
  }

  setFilter(status: string) {
    this.filter = status;
  }

  get filteredTasks() {
    if (this.filter === 'completed') {
      return this.tasks.filter(t => t.completed);
    }
    if (this.filter === 'pending') {
      return this.tasks.filter(t => !t.completed);
    }
    return this.tasks;
  }

  resetForm() {
    this.newTask = { title: '', description: '', completed: false, dueDate: '' };
  }

  resetEditState() {
    this.editMode = false;
    this.editingTaskId = null;
    this.resetForm();
  }

  onLogout() {
    this.authService.logout(); // Clears the token
    this.router.navigate(['/login']); // Redirects to login
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.completed) {
      return false; // No due date or already completed means it's not late
    }
    
    const today = new Date();
    // Set today's time to midnight to ensure accurate day-to-day comparison
    today.setHours(0, 0, 0, 0); 
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  }
}