export class UpdateContract {
  constructor(contractRepository, productRepository) {
    this.contractRepository = contractRepository
    this.productRepository = productRepository
  }

  async update(socialReason, contract) {
    const contractAlreadyExists =
      await this.contractRepository.findBySocialReason(socialReason)

    if (!contractAlreadyExists) {
      throw new Error('Contract does not exists')
    }

    const updatedContract = await this.contractRepository.update(
      contractAlreadyExists._id,
      contract
    )

    return updatedContract
  }
}
