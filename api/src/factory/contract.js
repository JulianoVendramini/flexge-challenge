import { GetContracts, CreateContract } from '../domain/services'
import { ContractRepository } from '../infra/repositories'

export const makeCreateContract = () => {
  const contractRepository = new ContractRepository()
  const createContractService = new CreateContract(contractRepository)

  return createContractService
}

export const makeGetAllContracts = () => {
  const contractRepository = new ContractRepository()
  const getContractsService = new GetContracts(contractRepository)

  return getContractsService
}
