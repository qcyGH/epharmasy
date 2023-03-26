import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './shopSlice'
import userReducer from './userSlice'
import { dbApi } from './dbApi'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        user: userReducer,
        [dbApi.reducerPath]: dbApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dbApi.middleware)
})