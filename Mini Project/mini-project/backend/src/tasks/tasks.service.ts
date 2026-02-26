import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Corresponds to Angular taskService.getTasks()
  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Corresponds to Angular taskService.addTask()
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      completed: false,
    });
    return await this.taskRepository.save(task);
  }

  // Corresponds to Angular taskService.updateTask()
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id: id,
      ...updateTaskDto,
    });
    
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    
    return await this.taskRepository.save(task);
  }

  // Corresponds to Angular taskService.deleteTask()
  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}