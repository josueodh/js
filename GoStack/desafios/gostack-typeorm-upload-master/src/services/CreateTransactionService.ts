// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository, TransactionRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  category: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category
  }: Request): Promise<Transaction> {

    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    let transactionCategory = await categoriesRepository.findOne({
      where: {
        title: category,
      },
    });
    if (type == 'outcome') {
      const balance = await transactionsRepository.getBalance();
      if ((balance.total - value) < 0) {
        throw new AppError('The money is insuficient');
      }
    }


    if (!transactionCategory) {
      transactionCategory = categoriesRepository.create({ title: category });
      transactionCategory = await categoriesRepository.save(transactionCategory);
    }

    const transaction = transactionsRepository.create({ title, value, type, category: transactionCategory });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
