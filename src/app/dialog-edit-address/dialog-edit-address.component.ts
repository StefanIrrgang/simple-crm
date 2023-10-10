import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collectionData, collection, doc, setDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit{

  firestore: Firestore = inject(Firestore);

  user!: User;
  loading = false;
  userId!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {}

  ngOnInit(): void {

  }

  async saveUser() {
    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDocRef, this.user.toJSON());
      console.log('User updated successfully');
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

}
