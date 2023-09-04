import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { StowageService } from '../services/stowage.service';
import { Stowage } from '../models/stowage';
import { StowageNumber } from '../models/stowageNumber';
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.css']
})
export class AdminProductAddComponent implements OnInit {
  addProductForm!: FormGroup;
  loading = false;
  submitted = false;  
  stowages!: Array<Stowage>;
  stowagesAvailable: Array<Stowage> = [];
  stowageNumberAvailable: Array<StowageNumber> = [];
  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private stowageService: StowageService,
    private router: Router){
      this.buildForm();
    }

    buildForm() {
      this.addProductForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        retailPrice: [null, Validators.required],
        wholeSalePrice: [null, Validators.required],
        stowageId: [null, Validators.required],
        stowageNumberName: [null, Validators.required],
      });
    }

  ngOnInit() {
    this.getStowageData();
  }

  getStowageData() {
    this.stowageService.getStowageData().subscribe(
      (result: any) => {
        this.stowages = result;
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.addProductForm?.invalid) {
      return;
    }

    this.loading = true;
    const stowageNumberSel  = this.stowageNumberAvailable.find(x=>x.name === this.addProductForm.controls['stowageNumberName'].value);
    let productObj = this.addProductForm.value;
    productObj.stowageNumbers = [];
    productObj.stowageNumbers.push(stowageNumberSel);
    this.productService.saveProduct(productObj)
    .subscribe({
      next:data => {
        console.log(data);
        this.loading = false;
        this.addProductForm.reset();
        this.router.navigate(['/admin-products']);
      },
      error:error => {
        console.log(error);
      }});
  }
  get addProductFormControl() { return this.addProductForm?.controls; }

  onChangeStowage(stowageId:any) {
    let stowageSelected = this.stowages.find(sn=>sn.stowageId == stowageId);
      let stowageNumbersAvailableTemp: Array<StowageNumber> = [];
      for (let index = 1; index <= stowageSelected!.capacity; index++) {
        const stN = stowageSelected?.stowageNumbers.find(x=>x.name === index.toString());
        if (!stN) {
          stowageNumbersAvailableTemp.push({
            stowageNumberId: 0,
            name: `${index}`,
            stowageId: stowageSelected!.stowageId,
            productId: 0
          });
        }
      }
      this.stowageNumberAvailable = stowageNumbersAvailableTemp;
  }
}
