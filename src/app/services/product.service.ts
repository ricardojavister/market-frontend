import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';
import { ProductFilter } from '../interfaces/product-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL: string = environment.apiUrl + 'products';
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  public GetAll(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.BASE_URL + '/search?keyword=' + keyword );
  }

  fetchProducts(productFilter: ProductFilter): Observable<Product[]> {
    return this.http.post<Product[]>(this.BASE_URL + '/search', productFilter).pipe(
      tap(products => this.productsSubject.next(products))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.products$;
  }

  updateProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }
}
