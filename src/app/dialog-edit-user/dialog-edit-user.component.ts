import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { Firestore, collectionData, collection, doc, setDoc, addDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EventService } from '../event.service';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  user!: User;
  birthDate!: Date;
  loading = false;
  userId!: string;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private eventService: EventService) { }

  ngOnInit(): void {

  }

  async saveEditedUser() {
    this.loading = true;
    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      await updateDoc(userDocRef, this.user.toJSON());
      this.loading = false;
      this.dialogRef.close();
      this.eventService.triggerUserUpdated();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

}