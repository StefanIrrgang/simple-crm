import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/models/project.class';

@Component({
  selector: 'app-dialog-add-project',
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  project = new Project();
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddProjectComponent>) { }
  ngOnInit(): void {

  }

  saveProject() {
    this.loading = true;
    // console.log('Current project is ', this.project);

    const projectJson = this.project.toJSON();

    const projectsCollection = collection(this.firestore, 'projects');

    addDoc(projectsCollection, projectJson)
      .then((result) => {
        // console.log('Adding project finished', result);

        setTimeout(() => {
          this.project = new Project();
          this.loading = false;
        }, 200);

        this.dialogRef.close();
      })
      .catch((error) => {
        // console.error('Error adding project', error);
      });
  }

}
