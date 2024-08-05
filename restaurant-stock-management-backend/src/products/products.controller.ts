import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Product {
    return this.productsService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: Product) {
    this.productsService.createProduct(product);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() product: Partial<Product>) {
    this.productsService.updateProduct(id, product);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.deleteProduct(id);
  }

  @Patch('restore/:id')
  restoreProduct(@Param('id') id: string) {
    this.productsService.restoreProduct(id);
  }
}
