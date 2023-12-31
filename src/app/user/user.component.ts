// user.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { FirebaseService } from '../firebase.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  users$!: Observable<User[]>;
  allUsers: User[] = [];
  userSubscription!: Subscription;

  constructor(public dialog: MatDialog, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.users$ = this.firebaseService.getUsersWithIDs();
    this.userSubscription = this.users$.subscribe(users => {
      this.allUsers = users;
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.addElementFDB('users', result)
          .then((newUserId) => {
            console.log('User added successfully with ID:', newUserId);
            // Hier die ID an die result-Variable übergeben
            result.id = newUserId;
            this.users$ = this.firebaseService.getUsersWithIDs(); // Aktualisiere die Benutzerdaten
          })
          .catch(error => {
            console.error('User was added with saveUser in Dialog', error);
          });
      }
    });
  }

  // ngOnInit(): void {
  //   this.users$ = this.firebaseService.subList('users');
  //   this.userSubscription = this.users$.subscribe(users => {
  //     this.allUsers = users;
  //   });
  // }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogAddUserComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.firebaseService.addElementFDB('users', result)
  //       .then((newUserId) => {
  //         console.log('User added successfully with ID:', newUserId);
  //         // Hier kannst du die ID an die result-Variable übergeben
  //         result.id = newUserId;
  //       })
  //         .catch(error => {
  //           console.error('User was added with saveUser in Dialog', error);
  //         });
  //     }
  //   });
  // }

  formatBirthDate(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.toLocaleDateString('en-US');
  }

  ngOnDestroy(): void {
    // Abo aufräumen, um Memory Leaks zu vermeiden
    this.userSubscription.unsubscribe();
  }
}
