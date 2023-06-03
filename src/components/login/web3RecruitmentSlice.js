import { createSlice } from '@reduxjs/toolkit'

export const web3RecruitmentSlice = createSlice({
  name: 'web3Recruitment',
  initialState: {
    value: null,
  },
  reducers: {
    setWeb3Recruitment: (state, action) => {
      state.value = {...state.value,...action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWeb3Recruitment } = web3RecruitmentSlice.actions

export default web3RecruitmentSlice.reducer