import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductSchema } from "./product.model";

@Injectable()
export class ProductsService {
  private products: Product[] = [];


  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>
    ){}

  // 
  async insertProduct(title: string, desc:string, price: number){
    const newProduct = new this.productModel({
      title: title,
      description: desc,
      price: price,
    });

    // this save method is provided by mongoose
    // mongoose creates a mongodb query
    // save returns a promise; await waits until we get the value
    const result = await newProduct.save();
    return result.id as string;

  }

  async getProducts(){
    // exec gives you a "real" promise
    const products = await this.productModel.find().exec();
    // no need to use [...] syntax because we already made an ew copy
    return products.map((prod) => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price
    }));
  }

  async getSingleProduct(productId: string){
    const product = await this.findProduct(productId);
    return { id: product.id, title: product.title, description: product.description, price: product.price};
  }


  async updateProduct(productId: string, title: string, desc: string, price: number){

    // returns a copy of a new product
    const updatedProduct = await this.findProduct(productId)

    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.description = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }

    updatedProduct.save();

  }

  deleteProduct(prodId: string){
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);

  }

  // private findProduct(id: string): [Product, number] {
  //   const productIndex = this.products.findIndex((prod) => prod.id === id)
  //   const product = this.products[productIndex]
  //   // create a copy of a new product OBJECT 
  //   if (!product){
  //     throw new NotFoundException('Could not find product');
  //   }
  //   return [product, productIndex];
  // }

  private async findProduct(id: string): Promise<Product> {
    // findOne is an extra product model that exists for cases where you need one item from mongoose
    // stops after it finds the first one
    // findByID finds by id
    let product;
    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find product.')
    }
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    // returns Mongoose's object
    return product;
  }
}