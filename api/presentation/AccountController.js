
class AccountController {
  constructor(accountUseCase) {
    this.accountUseCase = accountUseCase;
  }

    async getAccounts(req, res) {
        try {
            const accounts = await this.accountUseCase.getAccounts();

            return res.status(200).json(accounts);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAccount(req, res) {
        try {
            const account = await this.accountUseCase.getAccount(req.params.id);

            return res.status(200).json(account);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async createAccount(req, res) {
        try {
            const account = await this.accountUseCase.createAccount(req.body);

            return res.status(201).json(account);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async updateAccount(req, res) {
        try {
            const account = await this.accountUseCase.updateAccount(req.params.id, req.body);

            return res.status(200).json(account);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async deleteAccount(req, res) {
        try {
            await this.accountUseCase.deleteAccount(req.params.id);

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}