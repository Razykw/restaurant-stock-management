import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {

  @Input() isEditing: boolean | undefined;
  @Input() currentProduct: any;
  @Input() isVisible: boolean | undefined;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onSaveProduct() {
    this.saveProduct.emit();
  }

  isProductNameValid(productName:string){
    return productName.trim() !== '';
  }
}

