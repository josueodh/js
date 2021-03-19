import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface CreateTransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'income') {
        // eslint-disable-next-line no-param-reassign
        sum += transaction.value;
      }
      return sum;
    }, 0);
    const outcome = this.transactions.reduce((sum, transaction) => {
      if (transaction.type === 'outcome') {
        // eslint-disable-next-line no-param-reassign
        sum += transaction.value;
      }
      return sum;
    }, 0);

    const balance: Balance = { income, outcome, total: income - outcome };

    return balance;
  }

  public create({ type, title, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ type, title, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
