import { DialogAddProjectComponent } from '../dialog-add-project/dialog-add-project.component';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from 'src/models/project.class';
import { Firestore, getFirestore, collection, query, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  project = new Project();
  projects!: Observable<Project[]>;
  allProjects: Project[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const firestore = getFirestore();

    const q = query(collection(firestore, 'projects'));

    // Änderungen in Echtzeit abonnieren
    this.projects = collectionData(q, { idField: 'id' }) as Observable<Project[]>;

    onSnapshot(q, (querySnapshot) => {
      // console.log('Received changes from DB ', querySnapshot);
    
      this.allProjects = [];
    
      querySnapshot.forEach((doc) => {
        const projectData = doc.data();
        const projectWithId = new Project({ id: doc.id, ...projectData });
        this.allProjects.push(projectWithId);
      });
    
      // console.log('All companies:', this.allCompanies);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddProjectComponent);
  }

}
