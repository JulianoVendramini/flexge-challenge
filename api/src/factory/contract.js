import {
  GetContracts,
  CreateContract,
  GetContract,
  UpdateContract
} from '../domain/services'
import {
  CompanyRepository,
  ContractRepository,
  ProductRepository
} from '../infra/repositories'

export const makeCreateContract = () => {
  const contractRepository = new ContractRepository()
  const productRepository = new ProductRepository()
  const companyRepository = new CompanyRepository()
  const createContractService = new CreateContract(
    contractRepository,
    productRepository,
    companyRepository
  )

  return createContractService
}

export const makeGetAllContracts = () => {
  const contractRepository = new ContractRepository()
  const getContractsService = new GetContracts(contractRepository)

  return getContractsService
}

export const makeGetContract = () => {
  const contractRepository = new ContractRepository()
  const getContractService = new GetContract(contractRepository)

  return getContractService
}

export const makeUpdateContract = () => {
  const contractRepository = new ContractRepository()
  const productRepository = new ProductRepository()

  const updateContractService = new UpdateContract(
    contractRepository,
    productRepository
  )

  return updateContractService
}
