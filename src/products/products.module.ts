import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { productProviders } from './providers_entities/product.providers';
import { brandProviders } from './providers_entities/brand.providers';
import { categoryProviders } from './providers_entities/category.providers';

import { Product2, ProductSchema2 } from './entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product2.name,
        schema: ProductSchema2,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [
    ProductsService,
    productProviders,
    BrandsService,
    brandProviders,
    CategoriesService,
    categoryProviders,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
