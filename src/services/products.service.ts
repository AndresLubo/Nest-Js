import { Injectable } from '@nestjs/common';
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
      return { error: 'No se ha encontrado el producto solicitado' };
    return product;
  }

  create(payload: any) {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, changes: any) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) return { error: 'No se ha encontrado el producto' };

    const updateProduct = {
      ...this.products[index],
      ...changes,
    };

    this.products[index] = updateProduct;
    return updateProduct;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('No se ha encontrado el producto');

    this.products.splice(index, 1);
    return { message: `Delete product id: ${id}` };
  }
}
