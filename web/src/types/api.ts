export type User = {
  id: string
  username: string
  password?: string
}

export type ContractProps = {
  _id: string
  documentNumber: string
  socialReason: string
  address: string
  city: string
  contractDueDate: string
  contractEndDate: string
  contractStartDate: string
  country: string
  district: string
  email: string
  number: string
  phone: string
  state: string
  zipCode: string
  company: string
  products: ProductProps[]
}

export type CompanyProps = {
  _id: string
  name: string
}

export type ProductProps = {
  _id?: string
  name: string
  amount: number
  finalUnityPrice: number
  installments: number
  paidInstallments: number
  begginingTerm: string
}
