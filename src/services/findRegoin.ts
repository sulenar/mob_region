import pg, { ClientConfig } from 'pg';
import { config } from 'dotenv';
config();
const { Client } = pg;

const credentials: ClientConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
};

export const findRegion = (pref: string, num: string): Promise<string> => {
  const client = new Client(credentials);
  const queryString: string = `SELECT region FROM phones WHERE additional_num = ${pref} AND min_val <= ${num} AND max_val >= ${num}`;

  client.connect();
  return new Promise((resolve, reject) => {
    client
      .query(queryString)
      .then((res) => {
        client.end();
        resolve(res.rows[0]?.region || 'Регион не найден');
      })
      .catch((error: string) => {
        reject(`Ошибка: ${error}`);
      });
  });
};
