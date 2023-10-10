import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, getFirestore, doc, getDoc, collection, query, onSnapshot, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { EventService } from '../event.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  userId = '';
  user: User = new User();

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private eventService: EventService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id') || '';
      // console.log('GOT ID', this.userId);
      this.getUser();
    });
    this.eventService.userUpdated$.subscribe(() => {
      this.getUser();
    });
  }

  async getUser() {
    const userDoc = doc(this.firestore, 'users', this.userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      this.user = new User(userData);
      // console.log('Retrieved user', this.user)
    } else {
      // console.log('User not found');
    }
  }


  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

}
