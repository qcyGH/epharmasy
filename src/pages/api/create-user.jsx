import nextConnect from 'next-connect'
import dbConnection from '@/pages/api/db'

const handler = nextConnect()

handler.post(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return res.status(400).send('Name, email, phone, and password are required');
    }

    try {

        const connection = await dbConnection()

        const result = await connection.query(
        `INSERT INTO clients (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)`,
        [firstName, lastName, email, phoneNumber, password]
        )

        res.status(201).json(result)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
})

export default handler