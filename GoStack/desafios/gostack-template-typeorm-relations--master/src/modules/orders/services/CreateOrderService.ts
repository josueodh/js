import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import IOrdersRepository from '../repositories/IOrdersRepository';
import Order from '../infra/typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError(
        'Could not create the order with non-existing customer',
      );
    }

    const checkProducts = await this.productsRepository.findAllById(products);
    if (checkProducts.length !== products.length) {
      throw new AppError('One ore more products non-existing');
    }

    checkProducts.forEach(product => {
      const actualProduct = products.filter(p => p.id === product.id)[0];
      const quantity = product.quantity - actualProduct.quantity;
      if (quantity < 1) {
        throw new AppError('Quantity is invalid');
      }
    });

    const productsArray = products.map(product => {
      const productIndex = checkProducts.findIndex(p => p.id === product.id);
      return {
        product_id: product.id,
        price: checkProducts[productIndex].price,
        quantity: product.quantity,
      };
    });

    await this.productsRepository.updateQuantity(products);
    const order = await this.ordersRepository.create({
      customer,
      products: productsArray,
    });

    return order;
  }
}

export default CreateOrderService;
