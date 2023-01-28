import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item, Order } from '../models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnChanges {
  @Input()
  orderReceived: Order | null = null;

  total = 0;

  getTotal(): number {
    this.total = 0;
    const order = this.orderReceived as Order;
    for (let i of order?.Items) {
      this.total += i.quantity * i.unit_price;
    }
    return this.total;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.info('changes: ', changes['orderReceived']);
    const o = changes['orderReceived'].currentValue as Order;

    // this.total = 0;
    // for (let li of o?.Items) this.total += li.quantity * li.unit_price;
  }
}
