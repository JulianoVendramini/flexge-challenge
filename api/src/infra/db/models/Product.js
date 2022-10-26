import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: false, min: 0 },
  finalUnityPrice: { type: String, required: true, min: 0 },
  installments: { type: String, required: false, min: 0 },
  paidInstallments: { type: String, required: false, min: 0 },
  begginingTerm: { type: String, required: false }
})

export const Product = mongoose.model('Product', ProductSchema)
