import { Component, OnInit } from '@angular/core';
import { TaskService } from './shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskListArray: any[] | undefined;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTaskList().snapshotChanges().subscribe(
      item => {
        this.taskListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["key"] = element.key;
          this.taskListArray.push(x);
        })

        // sort
        this.taskListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        })
      }
    );
  }

  onAddClick(task: HTMLInputElement) {
    this.taskService.addTask(task.value);
    task.value = null

  }

  onCheckClick(task: string, isChecked: boolean) {
    this.taskService.checkOrUncheckTask(task, !isChecked);

  }

  onDeleteClick(task) {
    if (confirm('Are you sure you want to delete this task?') == true) {

      this.taskService.removeTask(task);
    }

  }

}
