import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collectionData, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }
  ngOnInit(): void {

  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user is ', this.user);

    const userJson = this.user.toJSON();

    const usersCollection = collection(this.firestore, 'users');

    addDoc(usersCollection, userJson)
      .then((result) => {
        console.log('Adding user finished', result);

        setTimeout(() => {
          this.user = new User();
          this.birthDate = new Date();
          this.loading = false;
        }, 200);

        this.dialogRef.close();
      })
      .catch((error) => {
        console.error('Error adding user', error);
      });
  }
}