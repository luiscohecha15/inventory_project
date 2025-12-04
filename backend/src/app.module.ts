import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoriesModule } from "./categories/categories.module";
import { ProductsModule } from "./products/products.module";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/inventory'),
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
