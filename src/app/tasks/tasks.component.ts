import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { Firestore, getFirestore, collection, query, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  task = new Task();
  tasks!: Observable<Task[]>;
  allTasks: Task[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const firestore = getFirestore();

    const q = query(collection(firestore, 'tasks'));

    // Änderungen in Echtzeit abonnieren
    this.tasks = collectionData(q, { idField: 'id' }) as Observable<Task[]>;

    onSnapshot(q, (querySnapshot) => {
      // console.log('Received changes from DB ', querySnapshot);
    
      this.allTasks = [];
    
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const taskWithId = new Task({ id: doc.id, ...taskData });
        this.allTasks.push(taskWithId);
      });
    
      // console.log('All tasks:', this.allTasks);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddProjectComponent);
  }

}