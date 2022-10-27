import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface IMessage {
  recipientId: string
  senderId: string
  message: {
    text: string
    createdAt: number
  }
}

interface IMessages {
  chat: IMessage[]
}

const initialState: IMessages = {
  chat: [],
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.chat.push(action.payload)
    },
  },
})

export const { addMessage } = messageSlice.actions

export const selectActiveChat = (state: RootState) =>
  state.messages.chat.filter(
    message =>
      message.recipientId === state.recipients.results.find(recipient => recipient.isActive)?.id ||
      message.senderId === state.recipients.results.find(recipient => recipient.isActive)?.id
  )

export default messageSlice.reducer
