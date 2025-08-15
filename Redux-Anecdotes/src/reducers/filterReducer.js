import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const filterSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
  filtration (state, action) {
    return action.payload
  }
}
})

export const { filtration } = filterSlice.actions
export default filterSlice.reducer