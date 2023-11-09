import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentTime: string = '';
  greeting: string = '';

  ngOnInit() {
    this.updateGreeting();
    this.updateTime();
    // Aktualisiere die Uhrzeit alle Sekunde
    setInterval(() => {
      this.updateTime();
    }, 1000);
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
  

}
