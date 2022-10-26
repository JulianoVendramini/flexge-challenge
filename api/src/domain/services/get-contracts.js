export class GetContracts {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async getAll(page, contractsPerPage) {
    const contracts = await this.contractRepository.findAll(
      page,
      contractsPerPage
    )
    const total = await this.contractRepository.count()

    return {
      contracts,
      page: parseInt(page),
      total
    }
  }
}
