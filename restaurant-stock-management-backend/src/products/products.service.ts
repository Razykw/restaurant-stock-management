import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsRepository } from './products.repository';


@Injectable()
export class ProductsService {
  constructor(private readonly productsRepo:ProductsRepository){}


  //____________________________________________________________________________
  getAllProducts(): Product[] {
     return this.productsRepo.getShownProducts();
  }

  //____________________________________________________________________________
  getProductById(id: string): Product {
    const product = this.productsRepo.getProductById(id);
    if (!product){
      throw new NotFoundException('Product not found');
    } 
    return product;
  }

  //____________________________________________________________________________
  private generateUniqueId(productsArr: Product[]): string {
    let uniqueId: string;
    do {
      uniqueId = Math.floor(Math.random() * 1000000).toString(); // Generate a random number between 0 and 999999
    } while (productsArr.find(product => product.id === uniqueId));
    return uniqueId;
  }

  createProduct(product: Product) {
    const productsArr = this. getAllProducts();
    const existingProduct = productsArr.find(p => p.serialNumber === product.serialNumber && !p.isDeleted);
    if (existingProduct) {
      throw new BadRequestException('Product with this serial number already exists');
    }

    product.id = this.generateUniqueId(productsArr);
    product.createdAt = new Date();
    product.updatedAt = new Date();
    product.isDeleted = false;
    productsArr.push(product);
    this.productsRepo.saveDatabase(productsArr);
  }

  //____________________________________________________________________________
  updateProduct(id: string, updatedProduct: Partial<Product>) {
    const productsArr = this.getAllProducts();
    const productIndex = productsArr.findIndex(p => p.id === id && !p.isDeleted);
    if (productIndex === -1) throw new NotFoundException('Product not found');

    const product = productsArr[productIndex];
    productsArr[productIndex] = { ...product, ...updatedProduct, updatedAt: new Date() };
    this.productsRepo.saveDatabase(productsArr);
  }

  //____________________________________________________________________________
  deleteProduct(id: string) {
    const productsArr = this.productsRepo.getShownProducts();
    const productIndex = productsArr.findIndex(p => p.id === id && !p.isDeleted);
    if (productIndex === -1) throw new NotFoundException('Product not found');
    productsArr[productIndex].isDeleted = true;
    this.productsRepo.saveDatabase(productsArr);
  }

  //____________________________________________________________________________
  restoreProduct(id: string) {
    const productsArr = this.productsRepo.getFilteredDatabase();
    const productIndex = productsArr.findIndex(p => p.id === id && p.isDeleted);
    if (productIndex === -1) throw new NotFoundException('Product not found');
    productsArr[productIndex].isDeleted = false;
    this.productsRepo.saveDatabase(productsArr);
  }
}
