import { createSlice } from '@reduxjs/toolkit'

export const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    value: null,
  },
  reducers: {
    createProvider: (state, action) => {
      state.value = {...state.value,...action.payload}
    },
    removeProvider: (state) => {
      state.value = null
    },
  },
})

export const { createProvider, removeProvider } = providerSlice.actions

export default providerSlice.reducer