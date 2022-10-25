export class GetContracts {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async getAll() {
    const companies = await this.contractRepository.findAll()

    return companies
  }
}
