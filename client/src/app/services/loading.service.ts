import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private spinner: NgxSpinnerService) { }

  busy() {
    this.spinner.show(undefined, {
      type: "square-jelly-box",
      size: 'large',
      bdColor: "rgba(0, 0, 0, 0.7)",
      color: "#64d6e2",
    })
  }

  idle() {
    this.spinner.hide()
  }
}
