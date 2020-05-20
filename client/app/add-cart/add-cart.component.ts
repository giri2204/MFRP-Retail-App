import { Component, OnInit } from '@angular/core';
import { AddCartService } from '../services/add-cart.service';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {
  products;
  checkoutform: FormGroup;
  Name = new FormControl('', Validators.required);
  Address = new FormControl('', Validators.required);
  CCNumber = new FormControl('', Validators.required);
  Expiration = new FormControl('', Validators.required);
  CCV = new FormControl('', [Validators.required, Validators.maxLength(3)]);

  constructor(private cartService: AddCartService, private formBuilder: FormBuilder) { 
    this.checkoutform = this.formBuilder.group({
      Name: this.Name,
      Address: this.Address,
      CCNumber: this.CCNumber,
      Expiration: this.Expiration,
      CCV: this.CCV
    });
  }

  ngOnInit() {
    this.products = this.cartService.getItems();
  }

  
  onSubmit(customerData) {
    // Process checkout data here
    //this.products = this.cartService.clearCart();
    this.checkoutform.reset();
    window.alert('Your order has been submitted');
    console.log(customerData);
  }

  

}
