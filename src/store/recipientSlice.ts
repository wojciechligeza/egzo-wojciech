import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'
import { RootState } from '.'

interface IResponse {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string
  }
  email: string
  dob: {
    date: string
    age: number
  }
  phone: string
  cell: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

interface IRecipientState {
  id: string
  isActive: boolean
}

export interface IRecipient extends IRecipientState, IResponse {}

interface ILoadingState {
  isLoading: boolean
  errorMessage: string
}

interface IRecipients {
  recipients: {
    results: IRecipient[]
  } & ILoadingState
}

const initialState: IRecipients = {
  recipients: {
    results: [],
    isLoading: false,
    errorMessage: '',
  },
}

const STANDARD_ERROR_MESSAGE = 'Something went wrong. Please try to reload the page.'

export const getRecipients = createAsyncThunk('getRecipients', async (url: string) => {
  const response = await fetch(url)
  const { results } = (await response.json()) as { results: IResponse[] }
  return results.map(recipient => ({ ...recipient, id: uuid(), isActive: false }))
})

export const recipientSlice = createSlice({
  name: 'recipient',
  initialState,
  reducers: {
    activate: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.recipients.results.forEach(recipient =>
        recipient.id === action.payload ? (recipient.isActive = true) : (recipient.isActive = false)
      )
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getRecipients.pending, state => {
        state.recipients.isLoading = true
      })
      .addCase(getRecipients.fulfilled, (state, action) => {
        state.recipients.isLoading = false
        state.recipients.results = action.payload
      })
      .addCase(getRecipients.rejected, (state, action) => {
        state.recipients.isLoading = false
        state.recipients.errorMessage = action.error.message || STANDARD_ERROR_MESSAGE
      })
  },
})

// Action creators are generated for each case reducer function
export const { activate } = recipientSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectRecipient = (state: RootState) => state.recipients

export default recipientSlice.reducer
