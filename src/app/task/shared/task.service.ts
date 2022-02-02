import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskList: AngularFireList<any> | undefined;
  constructor(private firebaseDb: AngularFireDatabase) { }

  getTaskList() {
    this.taskList = this.firebaseDb.list('Tasklist');
    return this.taskList;
  }

  addTask(task: string) {
    this.taskList?.push({ name: task, isChecked: false });
  }

  checkOrUncheckTask(key: string, flag: boolean) {
    this.taskList?.update(key, { isChecked: flag });
  }

  removeTask(task: string) {
    this.taskList?.remove(task);
  }

}
