// event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private userUpdatedSource = new Subject<void>();

  userUpdated$ = this.userUpdatedSource.asObservable();

  triggerUserUpdated() {
    this.userUpdatedSource.next();
  }
}