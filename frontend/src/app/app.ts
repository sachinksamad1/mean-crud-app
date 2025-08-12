import { Component, signal, OnInit } from '@angular/core';
import { TaskService, Task } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit{
  // protected readonly title = signal('frontend');

  title = 'Task Manager';
  tasks: Task[] | undefined = [];
  currentTask: Task = this.getEmptyTask();
  isEditing = false;
  showForm = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: ''
    };
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        if (response.success) {
          this.tasks = response.data;
        }
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  showAddForm() {
    this.currentTask = this.getEmptyTask();
    this.isEditing = false;
    this.showForm = true;
  }

  editTask(task: Task) {
    this.currentTask = { ...task };
    this.isEditing = true;
    this.showForm = true;
  }

  saveTask() {
    if (this.isEditing && this.currentTask._id) {
      this.taskService.updateTask(this.currentTask._id, this.currentTask).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadTasks();
            this.cancelEdit();
          }
        },
        error: (error) => {
          console.error('Error updating task:', error);
        }
      });
    } else {
      this.taskService.createTask(this.currentTask).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadTasks();
            this.cancelEdit();
          }
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }

  deleteTask(taskId: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(taskId).subscribe({
        next: (response) => {
          if (response.success) {
            this.loadTasks();
          }
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      });
    }
  }

  cancelEdit() {
    this.showForm = false;
    this.isEditing = false;
    this.currentTask = this.getEmptyTask();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#28a745';
      case 'in-progress': return '#007bff';
      case 'pending': return '#ffc107';
      default: return '#6c757d';
    }
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#fd7e14';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  }
}
