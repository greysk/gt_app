import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

const vibrateTimeMS = 500;

class Counter {
  rowCount: number;
  targetRowNum: number;
  projName: string
  isDone: boolean;

  updateStatus() {
    if (this.rowCount >= this.targetRowNum)
    {
      if (!this.isDone)  // Avoid repeatedly triggering vibrations.
        navigator.vibrate([1000, 500, 1000]);  // All done vibration
      this.isDone = true;
    }
    else
      this.isDone = false;
  }

  increaseCount() {
    this.rowCount++;
    navigator.vibrate(vibrateTimeMS);  // Confirmation vibration
    if (this.rowCount == this.targetRowNum)
    {
      this.isDone = true;
      navigator.vibrate([1000, 500, 1000]);  // All done vibration
    }
  }

  decreaseCount() {
    if (this.rowCount > 0)
    {
      this.rowCount--;
      navigator.vibrate(vibrateTimeMS);  // Confirmation vibration
      this.updateStatus();
    }
    else
      navigator.vibrate([500, 200]);  // Error vibration
  }

  constructor() {
    this.rowCount = 0;
    this.targetRowNum = 0;
    this.projName = "My Project";
    this.isDone = false;
  }
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  aCounter = new Counter();

  @ViewChild(IonModal) modal: IonModal | undefined;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string = "";

  cancel() {
    if (this.modal)
      this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.modal)
    {
      this.modal.dismiss(this.name, 'confirm');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
