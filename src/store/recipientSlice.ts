import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.'

export interface IRecipient {
  isActive: boolean
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

interface ILoadingState {
  isLoading: boolean
  errorMessage: string
}

type Recipients = {
  recipients: {
    data: {
      results: IRecipient[]
    }
  } & ILoadingState
}

const initialState: Recipients = {
  recipients: {
    data: {
      results: [],
    },
    isLoading: false,
    errorMessage: '',
  },
}

const STANDARD_ERROR_MESSAGE = 'Something went wrong. Please try to reload the page.'

export const getRecipients = createAsyncThunk('getRecipients', async (url: string) => {
  const response = await fetch(url)
  return (await response.json()) as { results: IRecipient[] }
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
      state.recipients.data.results.forEach(recipient =>
        recipient.email === action.payload ? (recipient.isActive = true) : (recipient.isActive = false)
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
        state.recipients.data.results = action.payload.results
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
