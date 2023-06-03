import { createSlice } from '@reduxjs/toolkit'

export const web3ModalSlice = createSlice({
  name: 'web3Modal',
  initialState: {
    value: null,
  },
  reducers: {
    createWeb3Modal: (state, action) => {
      state.value = {...state.value,...action.payload}
    },
    removeWeb3Modal: (state) => {
      state.value = null
    },
  },
})

export const { createWeb3Modal, removeWeb3Modal } = web3ModalSlice.actions

export default web3ModalSlice.reducer