import { createSlice } from '@reduxjs/toolkit'

export const currentPlayingIndexSlice = createSlice({
  name: 'currentPlayingIndex',
  initialState: {
    currIndex: 0
  },
  reducers: {
    updateCurrentPlayingIndex: (state, action) => {
      state.currIndex = action.payload;

      // console.log(action.payload);

    }
  },
})

// Action creators are generated for each case reducer function
export const { updateCurrentPlayingIndex } = currentPlayingIndexSlice.actions

export default currentPlayingIndexSlice.reducer