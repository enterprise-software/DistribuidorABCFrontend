import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StowageService } from '../services/stowage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Stowage } from '../models/stowage';
import { StowageNumber } from '../models/stowageNumber';
import { Product } from '../models/product';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent {

  addProductForm!: FormGroup;
  loading = false;
  submitted = false;  
  stowages!: Array<Stowage>;
  stowagesAvailable: Array<Stowage> = [];
  stowageNumberAvailable: Array<StowageNumber> = [];
  productId!:any;
  product!:Product;
  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    private stowageService: StowageService,
    private router: Router,
    private route: ActivatedRoute){
      this.productId = this.route.snapshot.paramMap.get('productId')
      console.log(this.route.snapshot.paramMap.get('productId'));
      
    }

  buildForm(product: Product) {
    this.addProductForm = this.formBuilder.group({
      name: [product.name, Validators.required],
      description: [product.description, Validators.required],
      retailPrice: [product.retailPrice, Validators.required],
      wholeSalePrice: [product.wholeSalePrice, Validators.required],
      stowageId: [product.stowageNumbers[0].stowageId, Validators.required],
      stowageNumberName: [product.stowageNumbers[0].name, Validators.required],
    });
  }

  ngOnInit() {
    this.getStowageData();
    this.getProductById();    
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe(
      (result:any) => {
        console.log(result);
        this.product = result;
        this.buildForm(result);
        this.onChangeStowage(this.product.stowageNumbers[0].stowageId);
      }
    );
  }

  getStowageData() {
    this.stowageService.getStowageData().subscribe(
      (result: any) => {
        this.stowages = result;
      }
    );
  }

  onChangeStowage(stowageId:any) {
    let stowageSelected = this.stowages.find(sn=>sn.stowageId == stowageId);
      let stowageNumbersAvailableTemp: Array<StowageNumber> = [];
      for (let index = 1; index <= stowageSelected!.capacity; index++) {
        const stN = stowageSelected?.stowageNumbers.find(x=>x.name === index.toString());
        if (stN) {
          stowageNumbersAvailableTemp.push(stN);           
        } else {
          stowageNumbersAvailableTemp.push({
            stowageNumberId: this.product.stowageNumbers[0].stowageNumberId,
            name: `${index}`,
            stowageId: stowageSelected!.stowageId,
            productId: this.product.productId
          });
        }
      }
      this.stowageNumberAvailable = stowageNumbersAvailableTemp;
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
    productObj.productId = this.product.productId;
    
    this.productService.updateProduct(productObj.productId, productObj)
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

}
