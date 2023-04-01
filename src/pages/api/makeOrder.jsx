import nextConnect from 'next-connect'
import dbConnection from '@/pages/api/db'

const handler = nextConnect()

handler.post(async (req, res) => {
    const { clientId, quantity, price, medicineId, address, paymentType } = req.body

    const date = new Date()

    const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    // required for payment and shipment query
    let orderId = 0

    if (!clientId || !quantity || !price || !medicineId || !address || !paymentType) {
      return res.status(400).send('clientId, quantity, price, medicineId, address, paymentType are required')
    }

    try {

        const connection = await dbConnection()

        // make query to db, then take insertId for orderId
        const order = await connection.query(
            `INSERT INTO orders (order_date, quantity, price, client_id, medicine_id) VALUES (?, ?, ?, ?, ?)`,
            [currentDate, quantity, price, clientId, medicineId]
        ).then((result) => {
            console.log('Order result: ', result[0].insertId)
            orderId = result[0].insertId
        })

        const payment = await connection.query(
            `INSERT INTO payments (payment_date, payment_type, amount, order_id) VALUES (?, ?, ?, ?)`,
            [currentDate, paymentType, price, orderId]
        )

        const shipment = await connection.query(
            `INSERT INTO shipments (shipment_date, quantity, order_id, address, status) VALUES (?, ?, ?, ?, ?)`,
            [currentDate, quantity, orderId, address, 'processing']
        )

        res.status(201).json(order)
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

export default handler