import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NumberValidators } from '../number-validator';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styles: [
  ]
})
export class ProductEditComponent implements OnInit {
  pageTitle: string = 'Edit Product';
  productForm: FormGroup;
  sub: any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array(['']),
      description: ''
    })

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getProduct(id);
      }
    )
  }

  submit(): void {

  }

  get tags(): FormArray {
    return <FormArray>this.productForm.get('tags')
  }

  addTags(): void {
    this.tags.push(new FormControl(''))
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getProduct(id: number): void {

  }

}
