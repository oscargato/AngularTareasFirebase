import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class TaskService {

  tasksCollection: AngularFirestoreCollection<task>;
  tasks: Observable<task[]>;
  taskDoc: AngularFirestoreDocument<task>;

  constructor(public afs:AngularFirestore) {
    this.tasksCollection = this.afs.collection('tareas');
    this.tasks = this.tasksCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as task;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getTasks() {
    return this.tasks; 
  }

  addTask(task: task) {
    this.tasksCollection.add(task);
  }

  deleteTask(task: task) {
    console.log(task);
    this.taskDoc = this.afs.doc(`tareas/${task.id}`);
    this.taskDoc.delete();
  }

  updateTask(task: task) {
    this.taskDoc = this.afs.doc(`tareas/${task.id}`);
    this.taskDoc.update(task);
  }

}