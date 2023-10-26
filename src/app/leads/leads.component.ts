// leads.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Chart } from 'chart.js/auto';
import { OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent implements OnInit, OnDestroy {
  userData: any[] = [];
  newAmount: number = 0;
  newAmounts: { [userId: string]: number | null } = {};
  showOverlay: boolean = false;
  overlayMessage: string = '';

  // Chart-Objekt
  chart!: Chart;

  constructor(private firebaseService: FirebaseService, private cdr: ChangeDetectorRef) { }

  ngOnDestroy(): void {
    // Überprüfe, ob das Diagramm vorhanden ist, bevor zerstören.
    if (this.chart) {
      this.chart.destroy();
    }
  }

  ngOnInit(): void {
    this.firebaseService.getUsersWithSum().subscribe((users) => {
      this.userData = users;

      // Diagramm erstellen
      this.createChart();
    });
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

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

    this.cdr.detectChanges();
  }

  addAmount(user: any): void {
    // Holen des Betrags für den aktuellen Benutzer
    const amount = this.newAmounts[user.id] || 0;

    // Hier die Summe aktualisieren
    const newSum = user.summe + amount;

    // Firebase aktualisieren
    this.firebaseService.updateUserSum(user.id, newSum);

    // Lokal die Summe aktualisieren, damit das Diagramm sofort reagiert
    user.summe = newSum;

    // Diagramm aktualisieren
    this.updateChart();

    // Betrag zurücksetzen
    this.newAmounts[user.id] = null;

    this.showOverlay = true;
    this.overlayMessage = 'Chart wurde aktualisiert';

    // Verstecke das Overlay nach 2 Sekunden
    setTimeout(() => {
      this.showOverlay = false;
    }, 2000);
  }

  updateChart(): void {
    // Überprüfen, ob das Diagramm bereits erstellt wurde
    if (this.chart) {
      // Aktualisieren der Daten
      const labels = this.userData.map((user) => `${user.firstName} ${user.lastName}`);
      const data = this.userData.map((user) => user.summe);

      // Aktualisieren des Diagramms
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;

      // Neuzeichnen des Diagramms
      this.chart.update();
    }
  }

}
