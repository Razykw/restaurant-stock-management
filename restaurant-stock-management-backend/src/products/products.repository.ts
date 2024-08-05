import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductsRepository {
  private readonly databasePath = path.resolve(__dirname, '../../src/database.json');


  //____________________________________________________________________________
  private getDatabase(): Product[] {
    const data = fs.readFileSync(this.databasePath, 'utf8');
    const jsonData = JSON.parse(data);
    if(jsonData != undefined && jsonData.products){
      return jsonData.products
    }else{
      return [];
    }
  }

  /*
  * In case we made an option to return all products including the deleted ones
  */
   //____________________________________________________________________________
    public getFilteredDatabase(includeDeleted: boolean = false): Product[] {
    const productsArray = this.getDatabase();
    return includeDeleted ? productsArray : productsArray.filter(product => !product.isDeleted);
  }
  

  //____________________________________________________________________________
  public getShownProducts(): Product[]  {
    return this.getDatabase();
  }

  /*
  * Get product using id
  */
   //____________________________________________________________________________
   public getProductById(id:string): Product {
    const products  = this.getFilteredDatabase();
    return products.find(product => product.id === id);
  }

  //____________________________________________________________________________
  public saveDatabase(products: Product[] ) {
    const newDatabase = {products}
    fs.writeFileSync(this.databasePath, JSON.stringify(newDatabase, null, 2));
  }


}
