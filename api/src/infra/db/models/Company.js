import mongoose from 'mongoose'

const CompanySchema = new mongoose.Schema({
  name: String,
  contract: { type: mongoose.Schema.Types.ObjectId, ref: 'Contract' }
})

export const Company = mongoose.model('Company', CompanySchema)
