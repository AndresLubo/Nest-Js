import { Module } from '@nestjs/common';

import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';
import { CategoriesService } from './services/categories.service';
import { productProviders } from './providers_entities/product.providers';
import { brandProviders } from './providers_entities/brand.providers';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [
    ProductsService,
    productProviders,
    BrandsService,
    brandProviders,
    CategoriesService,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
