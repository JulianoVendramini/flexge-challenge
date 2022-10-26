import { configureStore } from '@reduxjs/toolkit'
import sliceProducts from './sliceProducts'

const store = configureStore({
  reducer: {
    products: sliceProducts
  }
})

export default store
