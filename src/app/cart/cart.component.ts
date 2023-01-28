import { Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  form!: FormGroup;
  Items!: FormArray;
  order!: Order;

  @Output()
  onNewOrder = new Subject<Order>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Build the form
    this.form = this.createForm();
  }

  process() {
    this.order = this.form.value as Order;
    console.info('>>> form: ', this.order);
    this.onNewOrder.next(this.order);
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    this.Items = this.fb.array([]);
    return this.fb.group({
      name: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      address: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: this.fb.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      phone: this.fb.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      express: this.fb.control<boolean>(true),
      delivery: this.fb.control<string>('0900 - 1100', [Validators.required]),
      Items: this.Items,
    });
  }

  clearForm() {
    // clear the form
    this.form = this.createForm();
  }

  public addItem() {
    this.Items.push(this.createItem());
  }

  public deleteItem(i: number) {
    this.Items.removeAt(i);
  }

  private createItem(): FormGroup {
    return this.fb.group({
      item: this.fb.control<string>('', [Validators.required]),
      quantity: this.fb.control<number>(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(100),
      ]),
      unit_price: this.fb.control<number>(0, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }
}
