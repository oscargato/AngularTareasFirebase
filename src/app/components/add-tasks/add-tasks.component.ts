import { Component, OnInit } from '@angular/core';
import { task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css']
})
export class AddTasksComponent implements OnInit {

  tasks:task = {
  	title:'',
  	description:''
  };

  constructor(private servicio:TaskService) { }

  ngOnInit() {
  }


  onSubmit(){
  	if(this.tasks.title != '' && this.tasks.description != ''){
  		this.servicio.addTask(this.tasks);
  		this.tasks.title = '';
  		this.tasks.description = '';
  	}
  }

}
