const uuid = require('crypto');
class AccountUseCase {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

    async getAccounts() {
        return await this.accountRepository.getAccounts();
    }

    async createAccount(accountDTO) {
        const account = {
            account_number: uuid.randomUUID(),
            pendingBalance: accountDTO.pendingBalance,
            availableBalance: accountDTO.availableBalance,
            accountType: accountDTO.accountType,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return await this.accountRepository.createAccount(account);
    }

    async updateAccount(accountDTO) {
        const account = await this.accountRepository.getAccountById(accountDTO.account_number);

        if (!account) {
            throw new Error('Account not found');
        }

        account.pendingBalance = accountDTO.pendingBalance;
        account.availableBalance = accountDTO.availableBalance;
        account.accountType = accountDTO.accountType;
        account.updatedAt = new Date();

        return await this.accountRepository.updateAccount(account);
    }

    async deleteAccount(accountDTO) {
        return await this.accountRepository.deleteAccount(accountDTO);
    }

    async getAccountById(id) {
        return await this.accountRepository.getAccountById(id);
    }

}

module.exports = { AccountUseCase }