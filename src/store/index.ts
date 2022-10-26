import { configureStore } from '@reduxjs/toolkit'
import recipientsReducer from './recipientSlice'

const store = configureStore({
  reducer: {
    recipients: recipientsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
