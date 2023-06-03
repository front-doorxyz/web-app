import { createSlice } from '@reduxjs/toolkit'

export const web3Slice = createSlice({
  name: 'web3',
  initialState: {
    value: null,
  },
  reducers: {
    createWeb3: (state, action) => {
      state.value = {...state.value,...action.payload}
    },
    removeWeb3: (state) => {
      state.value = null
    },
  },
})

export const { createWeb3, removeWeb3 } = web3Slice.actions

export default web3Slice.reducer