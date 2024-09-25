import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalState = new Subject<boolean>();
  modalState$ = this.modalState.asObservable();

  openModal() {
    //this.modalState.next(true);
  }

  closeModal() {
    this.modalState.next(false);
  }
}