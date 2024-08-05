import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PRODUCTS_SERVICE:string = "products";
  private readonly API_URL = `http://localhost:3000/${this.PRODUCTS_SERVICE}`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}${id}`);
  }

  createProduct(product: Product): Observable<void> {
    return this.http.post<void>(this.API_URL, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  restoreProduct(id: string): Observable<void> {
    return this.http.patch<void>(`${this.API_URL}/restore/${id}`, {});
  }
}
