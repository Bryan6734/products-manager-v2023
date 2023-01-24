import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  insertProduct(title: string, desc:string, price: number){
    const prodId = Math.random().toString()
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  getProducts(){
    // if we return this.products, we're sending a reference (not a copy). this is dangerous!
    // must send copy
    console.log(this.products);
    return [...this.products];
  }

  getSingleProduct(productId: string){
    const product = this.findProduct(productId)[0];
    return {... product};
  }


  updateProduct(productId: string, title: string, desc: string, price: number){

    // for the product, we need to make sure we dont update with null valjues
    const [product, index] = this.findProduct(productId);
    const updatedProduct = {...product};
    console.log("update")
    console.log(updatedProduct)

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    this.products[index] = updatedProduct; 

  }

  deleteProduct(prodId: string){
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);

  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex((prod) => prod.id === id)
    const product = this.products[productIndex]
    // create a copy of a new product OBJECT 
    if (!product){
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }

  

}