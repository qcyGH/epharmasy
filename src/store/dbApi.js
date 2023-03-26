import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const dbApi = createApi({
    reducerPath: 'dbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '@/pages/api'
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
          return action.payload[reducerPath]
        }
    },
    endpoints: (build) => ({
        getMedicine: build.query({
            query: () => 'data',
        }),
        getOrders: build.query({
            query: () => 'orders',
        }),
        getClients: build.query({
            query: () => 'clients',
        }),
    }),
})

export const { useGetMedicineQuery, useGetOrdersQuery, useGetClientsQuery } = dbApi

export const { getMedicine, getOrders, getClients } = dbApi.endpoints