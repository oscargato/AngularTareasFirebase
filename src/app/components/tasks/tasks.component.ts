import { Component, OnInit } from '@angular/core';
import { task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:task[];
  editState: boolean = false;
  taskToEdit:task;

  constructor(public servicio:TaskService) { }

  ngOnInit() {
  		this.servicio.getTasks().subscribe(data => {
  			  this.tasks =  data;
  		});
  }

  deleteTask(event, task) {
    const response = confirm('Esta seguro de Eliminar?');
    if (response){
      this.servicio.deleteTask(task);
    }
    return;
  } 

  editTask(event, task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
  } 

  updateTask(task) {
    this.servicio.updateTask(task);
    this.taskToEdit = null;
    this.editState = false;
  }

}
