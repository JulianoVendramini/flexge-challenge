export class GetCompanies {
  constructor(companyRepository) {
    this.companyRepository = companyRepository
  }

  async getAll() {
    const companies = await this.companyRepository.findAll()

    return companies
  }
}
