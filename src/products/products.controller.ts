
// Controller

import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from "./products.service";

// filter for requests starting with "products"
@Controller('products')
export class ProductsController {

  // private readonly: we're only ever using ONE productsService
  constructor(private readonly productsService: ProductsService){}


  // body will take the body of the incoming request, search for title, and give it to us in prodTItle

  // this wont work without a module
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number
    ) {
      console.log("addproduct method");
      console.log(prodTitle, prodDesc, prodPrice);
      const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
      return {id: generatedId};
  }

  @Get()
  getAllProducts() {
    return this.productsService.getProducts();
  }

  // we dont know what id, but this helps us do /products/insertid
  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string, 
    @Body('price') prodPrice: number
    ){
      this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
      return null;
  }

  @Delete(":id")
  removeProduct(
    @Param('id') prodId: string
  ){
    this.productsService.deleteProduct(prodId);
    return null; 
  }

}