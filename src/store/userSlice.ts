import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  id: string
  avatar: string
}

const initialState: IUser = {
  id: 'WojciechRecruitmentTask',
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser: (state, action: PayloadAction<IUser>) => {
      state = action.payload
    },
  },
})

export const { changeUser } = userSlice.actions

export default userSlice.reducer
