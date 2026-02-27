import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../auth/entities/user.entity'; // Import the User entity

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // Accept user to filter tasks specifically for the logged-in owner
  async getTasks(user: User): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { user },
      order: { order: 'ASC', id: 'ASC' },
    });
  }

  // Assign the task to the user during creation
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.taskRepository.create({
      ...createTaskDto,
      completed: false,
      user, // This links the task to the user in the DB
    });
    return await this.taskRepository.save(task);
  }

  // Update logic remains similar, but should ideally check user ownership
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

  async deleteTask(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async reorderTasks(taskIds: number[], user: User): Promise<void> {
    // Loop through the array of IDs and update their order in the DB
    for (let i = 0; i < taskIds.length; i++) {
      await this.taskRepository.update({ id: taskIds[i], user }, { order: i });
    }
  }
}
