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

  async findAll() {
    const contracts = await Contract.find()

    return contracts
  }
}
