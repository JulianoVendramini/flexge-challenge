import { createSlice } from '@reduxjs/toolkit'
import { ProductProps } from '../types/api'

const initialState: ProductProps[] = []

const sliceProducts = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      return [...state, action.payload]
    },
    removeProduct: (state, action) => {
      return state.filter((product) => product._id !== action.payload)
    },
    resetProducts: () => initialState
  }
})

export default sliceProducts.reducer
export const { addProduct, removeProduct, resetProducts } =
  sliceProducts.actions

export const useProducts = (state: any) => {
  return state.products as ProductProps[]
}
