export class CreateCompany {
  constructor(companyRepository) {
    this.companyRepository = companyRepository
  }

  async create({ name }) {
    if (!name) {
      throw new Error('Company name is required')
    }

    const company = await this.companyRepository.findByName(name)

    if (company) {
      throw new Error('Company already exists')
    }

    const newCompany = {
      name
    }

    await this.companyRepository.create(newCompany)

    return newCompany
  }
}
