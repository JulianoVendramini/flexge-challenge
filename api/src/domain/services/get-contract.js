export class GetContract {
  constructor(contractRepository) {
    this.contractRepository = contractRepository
  }

  async get(socialReason) {
    const contract = await this.contractRepository.findBySocialReason(
      socialReason
    )

    return contract
  }
}
