import { Company } from '../db/models/Company'

export class CompanyRepository {
  async create(company) {
    const newCompany = await Company.create(company)

    return newCompany
  }

  async findByName(name) {
    const company = await Company.findOne({ name })

    return company
  }

  async addContract(company, contract) {
    const companyToUpdate = await Company.findByIdAndUpdate(company, {
      contract
    })

    return companyToUpdate
  }

  async findAll() {
    const companies = await Company.find({ contract: null })

    return companies
  }
}
