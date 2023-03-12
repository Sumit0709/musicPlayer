import { createSlice } from '@reduxjs/toolkit'

export const allAudioListSlice = createSlice({
  name: 'allAudioList',
  initialState: {
    audioList: [],
    numberOfAudios: 0
  },
  reducers: {
    updateAudioList: (state, action) => {
      state.audioList = action.payload.audios;
      state.numberOfAudios = action.payload.numberOfAudios;

      // console.log(action.payload);

    }
  },
})

// Action creators are generated for each case reducer function
export const { updateAudioList } = allAudioListSlice.actions

export default allAudioListSlice.reducer