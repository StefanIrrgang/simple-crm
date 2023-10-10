import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, getFirestore, collection, query, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  user = new User();
  users!: Observable<User[]>; // Hinzugefügt für die Anzeige der Benutzer in der Komponente
  allUsers: User[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const firestore = getFirestore();

    const q = query(collection(firestore, 'users'));

    // Änderungen in Echtzeit abonnieren
    this.users = collectionData(q, { idField: 'id' }) as Observable<User[]>;

    onSnapshot(q, (querySnapshot) => {
      console.log('Received changes from DB ', querySnapshot);
    
      this.allUsers = [];
    
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userWithId = new User({ id: doc.id, ...userData });
        this.allUsers.push(userWithId);
      });
    
      console.log('All users:', this.allUsers);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  formatBirthDate(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.toLocaleDateString('en-US'); // Hier kannst du das Format nach Bedarf anpassen
  }
}
