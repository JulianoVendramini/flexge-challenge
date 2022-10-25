import { CreateCompany, GetCompanies } from '../domain/services'
import { CompanyRepository } from '../infra/repositories'

export const makeCreateCompany = () => {
  const companyRepository = new CompanyRepository()
  const createCompanyService = new CreateCompany(companyRepository)

  return createCompanyService
}

export const makeGetAllCompanies = () => {
  const companyRepository = new CompanyRepository()
  const getCompaniesService = new GetCompanies(companyRepository)

  return getCompaniesService
}
