import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/models/product.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-add-product-form',
  templateUrl: './add-product-form.component.html',
  styleUrls: ['./add-product-form.component.scss']
})
export class AddProductFormComponent implements OnInit {
  @Input() products: Product[];

  addProductForm: FormGroup;
  Productname = new FormControl('', Validators.required);
  Productdesc = new FormControl('', Validators.required);
  Price = new FormControl('', Validators.required);
  Brand = new FormControl('', Validators.required);
  Barcode = new FormControl('', Validators.required);
  Image = new FormControl('', Validators.required);

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      Productname: this.Productname,
      Productdesc: this.Productdesc,
      Brand: this.Brand,
      Price: this.Price,
      Barcode: this.Barcode,
      Image: this.Image
    });
  }

  addProduct() {
    this.productService.addProduct(this.addProductForm.value).subscribe(
      res => {
        this.products.push(res);
        this.addProductForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  
}
