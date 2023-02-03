import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // sets up database connection
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(
    'mongodb+srv://bryansukidi:bryansukidi@cs3-mongodb.ayxucwf.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
