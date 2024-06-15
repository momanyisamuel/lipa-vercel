class ExpenseUseCase {
  constructor(expenseRepository) {
    this.expenseRepository = expenseRepository;
  }

  async createExpense(expense) {
    const expense = {
        name: expense.name,
        description: expense.description,
        amount: expense.amount,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    const response = await this.expenseRepository.createExpense(expense);

    return response;
  }

    async updateExpense(expense, expenseId) {
        const storedExpense = await this.expenseRepository.getExpenseById(expenseId);
    
        if (!storedExpense) {
        throw new Error('Expense not found');
        }

        storedExpense.name = expense.name;
        storedExpense.description = expense.description;
        storedExpense.amount = expense.amount;
        storedExpense.date = new Date();
        storedExpense.updatedAt = new Date();

        const response = await this.expenseRepository.updateExpense(expenseId, storedExpense);

        return response;
    }

  async getExpenses() {
    return this.expenseRepository.getExpenses();
  }

    async getExpenseById(expenseId) {
        return this.expenseRepository.getExpenseById(expenseId);
    }
}

module.exports = { ExpenseUseCase }