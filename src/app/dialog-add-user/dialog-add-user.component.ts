// dialog-add-user.component.ts
import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { MatDialogRef } from '@angular/material/dialog';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.birthDate = new Date(); // Hier die Initialisierung der Geburtsdatums nach Bedarf ändern
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
                                                    
    const userData = this.user.toJSON(); // Hier wird das User-Objekt in ein einfaches JavaScript-Objekt umgewandelt
  
    this.firebaseService.addElementFDB('users', userData)
      .then(() => {
        console.log('Adding user finished');
        this.loading = false;
        this.dialogRef.close(userData);
      })
      .catch((error) => {
        console.error('Error adding user', error);
        this.loading = false;
      });
  }
}
