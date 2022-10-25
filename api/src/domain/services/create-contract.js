export class CreateContract {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async create(contract) {
    const newContract = await this.contractRepository.findByDocument(
      contract.documentNumber
    )

    if (newContract) {
      throw new Error('Contract already exists')
    }

    await this.contractRepository.create(contract)

    return contract
  }
}
