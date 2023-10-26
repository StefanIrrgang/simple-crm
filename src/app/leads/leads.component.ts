// leads.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit {
  userData: any[] = [];
  newAmount: number = 0;

  // Chart-Objekt
  chart!: Chart;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getUsersWithSum().subscribe((users) => {
      this.userData = users;

      // Diagramm erstellen
      this.createChart();
    });
  }

  createChart(): void {
    const labels = this.userData.map((user) => `${user.firstName} ${user.lastName}`);
    const data = this.userData.map((user) => user.summe);

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Summe (€)',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  addAmount(user: any, amount: number): void {
    // Hier kannst du die Logik für das Hinzufügen von Beträgen implementieren
    // Beispiel: user.summe += amount;

    // Firebase aktualisieren
    this.firebaseService.updateUserSum(user.id, user.summe + amount);
  }
}
