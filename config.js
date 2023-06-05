import dotenv from 'dotenv';
import fs from 'node:fs';

const configPath = '.env';

//.env
const buffer = fs.readFileSync(configPath);
const config = dotenv.parse(buffer);
for (const key in config) {
  process.env[key] = config[key];
}

export const PORT = Number(process.env.PORT);
export const { DB_USER } = process.env;
export const { DB_HOST } = process.env;
export const { DB_NAME } = process.env;
export const { DB_PASSWORD } = process.env;
export const DB_PORT = Number(process.env.DB_PORT);
