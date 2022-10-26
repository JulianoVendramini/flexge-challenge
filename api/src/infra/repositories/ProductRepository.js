import { Product } from '../db/models/Product'

export class ProductRepository {
  async create(product) {
    const newProduct = await Product.create(product)

    return newProduct
  }

  async findAll() {
    const products = await Product.find()

    return products
  }
}
