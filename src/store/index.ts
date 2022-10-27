import { configureStore } from '@reduxjs/toolkit'
import recipientsReducer from './recipientSlice'
import messageReducer from './messageSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    recipients: recipientsReducer,
    messages: messageReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
