import { Client } from 'pg';

const dbConfig = {
    user: 'cre',
    host: 'localhost',
    database: 'finances',
    password: 'Cr1324!@',
    port: 5432, 
  };

export async function connectDB() {
  const connection = new Client(dbConfig);

  try {
    await connection.connect();
    return connection; // Retorna o cliente conectado
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}
