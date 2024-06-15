
class PrismaAccountUseCase {
  constructor({ prisma }) {
    this.prisma = prisma;
  }

  async createAccount(accountDTO) {
    const account = await this.prisma.account.create({
      data: {
        account_number: accountDTO.account_number,
        pendingBalance: accountDTO.pendingBalance,
        availableBalance: accountDTO.availableBalance,
        accountType: accountDTO.accountType,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return account;
  }

    async getAccounts() {
        return await this.prisma.account.findMany();
    }

    async updateAccount(accountDTO) {
        const account = await this.prisma.account.findUnique({
            where: {
                account_number: accountDTO.account_number,
            },
        });

        if (!account) {
            throw new Error('Account not found');
        }

        account.pendingBalance = accountDTO.pendingBalance;
        account.availableBalance = accountDTO.availableBalance;
        account.accountType = accountDTO.accountType;
        account.updatedAt = new Date();

        return await this.prisma.account.update({
            where: {
                account_number: accountDTO.account_number,
            },
            data: account,
        });
    }

    async deleteAccount(accountDTO) {
        return await this.prisma.account.delete({
            where: {
                account_number: accountDTO.account_number,
            },
        });
    }

    async getAccountById(id) {
        return await this.prisma.account.findUnique({
            where: {
                account_number: id,
            },
        });
    }
}