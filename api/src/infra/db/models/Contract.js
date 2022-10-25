import mongoose from 'mongoose'

const ContractSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: false },
  city: { type: String, required: false },
  documentNumber: { type: String, required: true },
  socialReason: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  number: { type: String, required: true },
  zipCode: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  contractStartDate: { type: String, required: true },
  contractEndDate: { type: String, required: true },
  contractDueDate: { type: String, required: true },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
  ]
})

export const Contract = mongoose.model('Contract', ContractSchema)
