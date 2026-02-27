import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', 
      password: '10052004d', // Replace with your actual password
      database: 'taskdb',           // Ensure this DB exists in Postgres
      entities: [Task, User],
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}