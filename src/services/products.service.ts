import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 111,
      image: '',
      stock: 12,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product)
      throw new NotFoundException({
        error: 'No se ha encontrado el producto solicitado',
      });
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: UpdateProductDto) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1)
      throw new NotFoundException({
        error: 'No se ha encontrado el producto solicitado',
      });

    const updateProduct = {
      ...this.products[index],
      ...changes,
    };

    this.products[index] = updateProduct;
    return updateProduct;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1)
      throw new NotFoundException({
        error: 'No se ha encontrado el producto solicitado',
      });

    this.products.splice(index, 1);
    return { message: `Delete product id: ${id}` };
  }
}
