import { createSlice } from '@reduxjs/toolkit'

const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        items: [],
        orderList: [],
    },
    reducers: {
        addItem(state, action) {


            const item = action.payload.item

            const itemIndex = state.orderList.findIndex(orderItem => orderItem.medicine_id === item.medicine_id)

            if (itemIndex < 0) {
                //showNotification(item.name)

                state.orderList.push({
                    ...item,
                    quantity: 1,
                })

            } else {

                const newOrderList = state.orderList.map((orderItem, index) => {
                    if (index === itemIndex) {
                        return {
                            ...orderItem,
                            quantity: orderItem.quantity + 1
                        }
                    } else {
                        return orderItem
                    }
                })

                state.orderList = newOrderList
            }

        },
        removeItem(state, action) {
            console.log(action.payload)
            const newOrder = state.orderList.filter((item) => item.medicine_id !== action.payload)
            state.orderList = newOrder
        },
        changeQuantity(state, action) {

            const itemIndex = state.orderList.findIndex(orderItem => orderItem.medicine_id === action.payload.item.medicine_id)

            const newOrder = state.orderList.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: action.payload.count
                    }
                } else {
                    return orderItem
                }
            })

            state.orderList = newOrder
        },
        makePurchase(state, action) {

            state.orderList = []
        },
        fetchItems(state, action) {
            if (action.payload.data) {
                state.items = action.payload.data
            }
        }
    },
})

export const { addItem, removeItem, changeQuantity, makePurchase, fetchItems } = shopSlice.actions

export default shopSlice.reducer