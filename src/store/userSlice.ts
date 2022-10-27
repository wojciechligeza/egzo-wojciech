import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  id: string
  avatar: string
}

const initialState: IUser = {
  id: 'WojciechRecruitmentTask',
  avatar:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
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
