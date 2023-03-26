import mysql from 'mysql2/promise';

const dbConnection = async () => {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'su',
    database: 'epharmasy',
  })

  return db;
}

export default dbConnection;