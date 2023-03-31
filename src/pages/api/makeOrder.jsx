import nextConnect from 'next-connect'
import dbConnection from '@/pages/api/db'

const handler = nextConnect()

handler.post(async (req, res) => {
    const { clientId, quantity, price, medicineId, address, paymentType } = req.body

    const date = new Date()

    const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    if (!clientId || !quantity || !price || !medicineId || !address || !paymentType) {
      return res.status(400).send('clientId, quantity, price, medicineId, address, paymentType are required')
    }

    const fake = {
        "data": [
            {
                "fieldCount": 0,
                "affectedRows": 1,
                "insertId": 37,
                "info": "",
                "serverStatus": 2,
                "warningStatus": 0
            },
            null
        ],
        "status": 201,
        "statusText": "Created",
        "headers": {
            "connection": "keep-alive",
            "content-length": "99",
            "content-type": "application/json; charset=utf-8",
            "date": "Fri, 31 Mar 2023 23:05:35 GMT",
            "etag": "\"3gr2j6czf82r\"",
            "keep-alive": "timeout=5",
            "vary": "Accept-Encoding"
        },
        "config": {
            "transitional": {
                "silentJSONParsing": true,
                "forcedJSONParsing": true,
                "clarifyTimeoutError": false
            },
            "adapter": [
                "xhr",
                "http"
            ],
            "transformRequest": [
                null
            ],
            "transformResponse": [
                null
            ],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1,
            "env": {},
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            "method": "post",
            "url": "/api/makeOrder",
            "data": "{\"clientId\":23,\"quantity\":[1],\"price\":5,\"medicineId\":[1],\"address\":\"Kyiv\",\"paymentType\":\"cash\"}"
        },
        "request": {}
    }

    try {

        const connection = await dbConnection()

        const order = await connection.query(
            `INSERT INTO orders (order_date, quantity, price, client_id, medicine_id) VALUES (?, ?, ?, ?, ?)`,
            [currentDate, quantity, price, clientId, medicineId]
        )

        //! const orderId = await order.data.insertId

        const payment = await connection.query(
            `INSERT INTO payments (payment_date, payment_type, amount, order_id) VALUES (?, ?, ?, ?)`,
            [currentDate, paymentType, price, 28]
        )

        // const shipment = await connection.query(
        //     `INSERT INTO shipments (shipment_date, quantity, address, status) VALUES (?, ?, ?, ?)`,
        //     [currentDate, quantity, address, 'processing']
        // )

        res.status(201).json(order)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

export default handler