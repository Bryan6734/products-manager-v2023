import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./product.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// app module needs products module, so must import this to app module

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])], // allows us to inject file into any file that needs it
  controllers: [ProductsController],
  providers: [ProductsService]
})

export class ProductsModule{

}
