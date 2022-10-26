import { Contract } from '../db/models/Contract'

export class ContractRepository {
  async create(contract) {
    const newContract = await Contract.create(contract)

    return newContract
  }

  async findByDocument(documentNumber) {
    const contract = await Contract.findOne({ documentNumber })

    return contract
  }

  async findAll(page, contractsPer) {
    const contracts = await Contract.find()
      .skip((page - 1) * contractsPer)
      .limit(contractsPer)
      .populate('company')
      .populate(['products'])

    return contracts
  }

  async findBySocialReason(socialReason) {
    const contract = await Contract.findOne({ socialReason })
      .populate('company')
      .populate(['products'])

    return contract
  }

  async update(contractId, contract) {
    const contractToUpdate = await Contract.findByIdAndUpdate(
      {
        _id: contractId
      },
      contract
    )

    return contractToUpdate
  }

  async count() {
    const total = await Contract.countDocuments()

    return total
  }
}
