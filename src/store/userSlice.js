import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: '',
        id: 0
    },
    reducers: {
        signin(state, action) {
            state.user = action.payload.user,
            state.id = action.payload.id
        },
        signout(state, action) {
            state.user = '',
            state.id = 0
        }
    },
})

export const { signin, signout } = userSlice.actions

export default userSlice.reducer