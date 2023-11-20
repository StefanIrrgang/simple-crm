import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/user.class';
import { Company } from 'src/models/company.class';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentTime: string = '';
  greeting: string = '';
  users$!: Observable<User[]>;
  companies$!: Observable<Company[]>;
  projects$!: Observable<Company[]>;
  tasks$!: Observable<Company[]>;
  userSubscription!: Subscription;
  allUsers: User[] = [];

  currentUserIdIndex = 0;
  currentUser: User | undefined;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.users$ = this.firebaseService.subList('users');
    this.companies$ = this.firebaseService.subList('companies');
    this.projects$ = this.firebaseService.subList('projects');
    this.tasks$ = this.firebaseService.subList('tasks');
    this.userSubscription = this.users$.subscribe(users => {
      this.allUsers = users;
    });
    this.updateGreeting();
    this.updateTime();
    // Aktualisiere die Uhrzeit alle Sekunde
    setInterval(() => {
      this.updateTime();
    }, 1000);
    setInterval(() => {
      this.updateCurrentUser();
    }, 3000);
  }

  updateGreeting() {
    const currentHour = new Date().getHours();
    const currentDate = new Date();

    if (currentHour >= 5 && currentHour < 12) {
      this.greeting = `Good morning, it's the ${currentDate.getDate()}th of ${this.getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = `Good afternoon, it's the ${currentDate.getDate()}th of ${this.getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
    } else {
      this.greeting = `Good evening, it's the ${currentDate.getDate()}th of ${this.getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
    }
  }

  getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return months[month];
  }

  updateTime() {
    const now = new Date();
    const hours = this.formatTimeUnit(now.getHours());
    const minutes = this.formatTimeUnit(now.getMinutes());
    const seconds = this.formatTimeUnit(now.getSeconds());

    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }

  private formatTimeUnit(unit: number): string {
    return unit < 10 ? `0${unit}` : `${unit}`;
  }

  getChartData(usersCount: number): any[] {
    const maxUsers = 25;
    const remainingUsers = maxUsers - usersCount;
  
    return [
      {
        name: 'Users',
        value: usersCount,
      },
      {
        name: 'Remaining',
        value: remainingUsers,
      },
    ];
  }
  
  updateCurrentUser() {
    if (this.allUsers.length > 0) {
      this.currentUser = this.allUsers[this.currentUserIdIndex];
      console.log(`Current User: ${this.currentUser?.firstName} ${this.currentUser?.lastName}, Sum: ${this.currentUser?.summe}`);
      this.currentUserIdIndex = (this.currentUserIdIndex + 1) % this.allUsers.length;
    }
  }
  
}