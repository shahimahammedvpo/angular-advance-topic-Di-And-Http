import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './product.service';

interface product{
  id:number;
  title:string;
  price:number;
  thumbnail:string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private productService=inject(ProductService);

  products:product[]=[];
  loading=true;
  errorMessage='';
  successMessage='';
  posting=false;

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts():void{
    this.loading=true;
    this.errorMessage='';

    this.productService.getProducts().subscribe({
      next:(response)=> {
        this.products=response.products;
        this.loading=false;
      },
      error:()=>{
        this.errorMessage='failed to load';
        this.loading=false;
      }
    })
  }

  addProduct():void{
    this.posting=true;
    this.errorMessage='';
    this.successMessage='';

    const newProduct={
      title:'dummy',
      price:1999,
      description: 'Product created using Angular HttpClient',
      category: 'beauty'
    };
    this.productService.addProduct(newProduct).subscribe({
      next: (response) => {
        this.successMessage =`Product "${response.title}" posted successfully!`;
        this.posting = false;
      },
      error: () => {
        this.errorMessage = 'Failed to post the product.';
        this.posting = false;
      }
    });

  }
}
