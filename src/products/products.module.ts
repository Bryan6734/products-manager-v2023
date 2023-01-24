import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// app module needs products module, so must import this to app module

@Module({
  controllers: [ProductsController],
  providers: [ProductsService]
})

export class ProductsModule{

}
