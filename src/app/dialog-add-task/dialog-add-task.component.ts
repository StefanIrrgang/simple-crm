import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';


@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  task = new Task();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddTaskComponent>) { }
  ngOnInit(): void {

  }

  saveTask() {
    this.loading = true;
    // console.log('Current project is ', this.task);

    const projectJson = this.task.toJSON();

    const projectsCollection = collection(this.firestore, 'tasks');

    addDoc(projectsCollection, projectJson)
      .then((result) => {
        // console.log('Adding task finished', result);

        setTimeout(() => {
          this.task = new Task();
          this.loading = false;
        }, 200);

        this.dialogRef.close();
      })
      .catch((error) => {
        // console.error('Error adding task', error);
      });
  }

}