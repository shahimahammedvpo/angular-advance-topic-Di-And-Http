import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http=inject(HttpClient);
  private apiUrl=' https://dummyjson.com/products';

  getProducts():Observable<any>{
    return this.http.get<any>(this.apiUrl);
  }
 addProduct(product:any):Observable<any>{
  return this.http.post<any>(`${this.apiUrl}/add`,product);
 }
}
