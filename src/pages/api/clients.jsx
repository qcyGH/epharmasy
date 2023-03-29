import nextConnect from 'next-connect'
import dbConnection from '@/pages/api/db'

const handler = nextConnect()

handler.get(async (req, res) => {
  try {
    const connection = await dbConnection()
    const [rows] = await connection.query('SELECT * FROM clients')
    res.status(200).json({
      data: rows,
      status: 200
    })
    console.info('Clients: Database connection successful')
  } catch (error) {
    res.status(500).json({ status: 500 })
    console.info('Database connection error')
  }
})

export default handler;