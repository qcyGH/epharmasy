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

    const [data, setData] = useState(getData)

    async function getData() {

        let result = {}

        try {
            const response = await fetch('/api/medicines')
            result = await response.json()

            setData(result)

        } catch(error) {
            console.error(error)
        }

        return result
    }


    return [data, getData]
}

export async function useOrders() {

    const [data, setData] = useState(getData)

    async function getData() {

        let result = {}

        try {
            const response = await fetch('/api/orders')
            result = await response.json()

            setData(result)

        } catch(error) {
            console.error(error)
        }

        return result
    }


    return [data, getData]
}

export async function usePayments() {

    const [data, setData] = useState(getData)

    async function getData() {

        let result = {}

        try {
            const response = await fetch('/api/payments')
            result = await response.json()

            setData(result)

        } catch(error) {
            console.error(error)
        }

        return result
    }


    return [data, getData]
}

export async function useShipments() {

    const [data, setData] = useState(getData)

    async function getData() {

        let result = {}

        try {
            const response = await fetch('/api/shipments')
            result = await response.json()

            setData(result)

        } catch(error) {
            console.error(error)
        }

        return result
    }


    return [data, getData]
}