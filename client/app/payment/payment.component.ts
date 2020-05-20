import { Component, OnInit } from '@angular/core';
import { AddCartService } from '../services/add-cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  shippingCosts;
  constructor(private cartService: AddCartService) { }

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

}
