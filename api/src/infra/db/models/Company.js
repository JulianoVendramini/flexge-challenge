import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: String
})

export const Company = mongoose.model('Company', CompanySchema)
