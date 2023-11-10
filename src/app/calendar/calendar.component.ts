import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, AfterViewInit {
  calendar!: Calendar;

  ngOnInit() {
    // Hier nicht initialisieren, da das DOM-Element möglicherweise noch nicht bereit ist
  }

  ngAfterViewInit() {
    // Hier, nachdem die Ansicht initialisiert wurde, können wir das DOM-Element sicher abrufen
    const calendarEl = document.getElementById('calendar');

    if (calendarEl) {
      this.calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        events: [
          { title: 'Team meeting', date: '2023-11-14' },
          { title: 'Network meeting', date: '2023-11-21' },
          { title: 'Team meeting', date: '2023-11-28' },
          { title: 'Sales meeting', date: '2023-11-19' },
          { title: 'Network meeting', date: '2023-12-13' },
          { title: 'Logistics meeting', date: '2023-12-21' },
        ]
      });

      this.calendar.render();
    }
  }
}