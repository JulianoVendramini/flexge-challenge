export class CreateContract {
  constructor(contractRepository, productRepository, companyRepository) {
    this.contractRepository = contractRepository
    this.productRepository = productRepository
    this.companyRepository = companyRepository
  }

  async create(contract) {
    const contractAlreadyExists = await this.contractRepository.findByDocument(
      contract.documentNumber
    )

    if (contractAlreadyExists) {
      throw new Error('Contract already exists')
    }

    const products = contract.products.map(async (product) => {
      const newProduct = await this.productRepository.create(product)

      return newProduct
    })

    const normalizedContract = {
      ...contract,
      products: await Promise.all(products)
    }

    const newContract = await this.contractRepository.create(normalizedContract)

    await this.companyRepository.addContract(contract.company, newContract._id)

    return newContract
  }
}
