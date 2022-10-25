import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: false, min: 0 },
  finalUnityPrice: { type: Number, required: true, min: 0 },
  installments: { type: Number, required: false, min: 0 },
  paidInstallments: { type: Number, required: false, min: 0 },
  begginingTerm: { type: Date, required: false }
})

export const Product = mongoose.model('Product', ProductSchema)
