import { getRepository, Repository } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      name,
      price,
      quantity,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const arrayOfProducts = await this.ormRepository.findByIds(
      products.map(product => product.id),
    );

    return arrayOfProducts;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    let arrayOsProducts = await this.findAllById(products);

    const productWithNewQuantity = arrayOsProducts.map(product => {
      const actualProduct = products.filter(p => p.id === product.id)[0];
      actualProduct.quantity = product.quantity - actualProduct.quantity;
      return actualProduct;
    });

    await this.ormRepository.save(productWithNewQuantity);

    arrayOsProducts = await this.findAllById(products);

    return arrayOsProducts;
  }
}

export default ProductsRepository;
