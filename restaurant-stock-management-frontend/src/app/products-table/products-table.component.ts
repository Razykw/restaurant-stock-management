import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { ProductModalComponent } from "../product-modal/product-modal.component";



@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductModalComponent],
  providers: [HttpClient],
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  // Members
  products: Product[] = [];
  searchTerm: string = '';
  isModalVisible: boolean = false;
  isEditing: boolean = false;
  currentProduct: Product = this.initializeProduct();
  feedbackMessage: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data.filter(product => !product.isDeleted);
    });
  }

  getVisibleProducts(): Product[] {
    return this.products.filter(product => !product.isDeleted);
  }


  filteredProducts():Product[] {
    return this.products.filter(product => product.name && product.name.includes(this.searchTerm));
  }

  sortBy(attribute: keyof Product) {
    this.products.sort((a, b) => a[attribute] > b[attribute] ? 1 : -1);
  }

  initializeProduct(): Product {
    return {
      id: '',
      name: '',
      quantity: 0,
      serialNumber: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    };
  }

 //CRUD methods
  addProduct() {
    this.productService.createProduct(this.currentProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
        this.setFeedbackMessage('Product added successfully.');
      },
      error: (error) => {
        if (error.status === 400 && error.error.message === 'Product with this serial number already exists') {
          this.setFeedbackMessage('Failed to add product: Duplicate serial number.');
        } else {
          this.setFeedbackMessage('Failed to add product: ' + error.message);
        }
      }
    });
  }


  private isProductNameValid(productName:string){
    return productName.trim() !== '';
  }


  updateProduct() {

    if(!this.isProductNameValid(this.currentProduct.name)){
      this.setFeedbackMessage('Product name is required.');
      return;
    }

    if(this.currentProduct.quantity < 0){
      this.setFeedbackMessage("Quantity cannot be negative");
      return;
    }

    if(!this.isProductNameValid(this.currentProduct.serialNumber)){
      this.setFeedbackMessage('Serial Number is required.');
      return;
    }

    this.productService.updateProduct(this.currentProduct.id, this.currentProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
        this.setFeedbackMessage('Product updated successfully.');
      },
      error: (error) => this.setFeedbackMessage('Failed to update product: ' + error.message)
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.setFeedbackMessage('Product deleted successfully.');
      },
      error: (error) => this.setFeedbackMessage('Failed to delete product: ' + error.message)
    });
  }

  restoreProduct(id: string) {
    this.productService.restoreProduct(id).subscribe({
      next: () => {
        this.loadProducts();
        this.setFeedbackMessage('Product restored successfully.');
      },
      error: (error) => this.setFeedbackMessage('Failed to restore product: ' + error.message)
    });
  }

 
  //Modal methods
  closeModal() {
    this.isModalVisible = false;
  }

  showAddProductModal() {
    this.isEditing = false;
    this.currentProduct = this.initializeProduct();
    this.isModalVisible = true;
  }

  showEditProductModal(product: Product) {
    this.isEditing = true;
    this.currentProduct = {...product};
    this.isModalVisible = true;
  }

  saveProduct() {
    if (this.isEditing) {
      this.updateProduct();
    } else {
      this.addProduct();
    }
    this.closeModal();
  }

  //Feedback method
  setFeedbackMessage(message: string) {
    this.feedbackMessage = message;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 3000);
  }
}