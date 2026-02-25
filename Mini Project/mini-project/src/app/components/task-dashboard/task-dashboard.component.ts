import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interface/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent {

  tasks: Task[] = [];
  filter: string = 'all';

  newTask: Omit<Task, 'id'> = {
    title: '',
    description: '',
    completed: false
  };

  editMode: boolean = false;
  editingTaskId: number | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  addOrUpdateTask() {
    if (this.editMode && this.editingTaskId !== null) {
      this.taskService.updateTask({
        id: this.editingTaskId,
        ...this.newTask
      });
      this.editMode = false;
      this.editingTaskId = null;
    } else {
      this.taskService.addTask(this.newTask);
    }
    this.tasks = this.taskService.getTasks();
    this.resetForm();
  }

  editTask(task: Task) {
    this.newTask = { ...task };
    this.editMode = true;
    this.editingTaskId = task.id;
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  toggleComplete(task: Task) {
    this.taskService.updateTask({
      ...task,
      completed: !task.completed
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
    this.newTask = { title: '', description: '', completed: false };
  }
}