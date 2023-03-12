import { configureStore } from '@reduxjs/toolkit'

import allAudioListReducer from './allAudioListSlice'
import currentPlayingIndexReducer from './currentPlayingIndexSlice'

const myStore = configureStore({
  reducer: {
    allAudioList: allAudioListReducer,
    currentPlayingIndex: currentPlayingIndexReducer
  },
})

export default myStore;