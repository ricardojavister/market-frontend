import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductFilter } from '../../interfaces/product-filter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  form!: FormGroup;
  constructor(private productService: ProductService, private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      keyword: [null, Validators.required],
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.search();
    }
  }

  search(): void {
    let keyword = this.form.value.keyword;
    let productFilter : ProductFilter = {
      keyWord: keyword
    }
    this.productService.fetchProducts(productFilter).subscribe(data => {
    });
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

}
