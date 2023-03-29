import { useState } from 'react'

// this is function
export function useClients() {

    const [data, setData] = useState(getData)

    async function getData() {

        let result = {}

        try {
            const response = await fetch('/api/clients')
            result = await response.json()

            setData(result)

        } catch(error) {
            console.error(error)
        }

        return result
    }


    return [data, getData]
}

export async function useMedicines() {
    try {
        const response = await fetch('/api/medicines')
        const result = await response.json()

        return result

    } catch(error) {
        console.error(error)
    }
}

export async function useOrders() {
    try {
        const response = await fetch('/api/orders')
        const result = await response.json()

        return result

    } catch(error) {
        console.error(error)
    }
}

export async function usePayments() {
    try {
        const response = await fetch('/api/payments')
        const result = await response.json()

        return result

    } catch(error) {
        console.error(error)
    }
}

export async function useShipments() {
    try {
        const response = await fetch('/api/shipments')
        const result = await response.json()

        return result

    } catch(error) {
        console.error(error)
    }
}