import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Order } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'day33_reactiveforms';

  order: Order | null = null;

  customerName!: string;

  processNewOrder(order: Order) {
    this.order = order;
    console.info('>>> in AppComponent: ', this.order);
  }
}
