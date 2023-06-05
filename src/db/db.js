import pkg from 'pg';
import {
  DB_NAME,
  DB_PORT,
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
} from '../../config.js';

const { Pool } = pkg;
let pool = null;
//1082 for date type
pkg.types.setTypeParser(1082, function (stringValue) {
  return stringValue;
});

const createPool = () =>
  new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: DB_PORT,
    ssl: {
      rejectUnauthorized: false,
    },
  });

export default {
  connect: async (cb = undefined) => {
    if (pool === null) {
      pool = createPool();
    }
    if (cb) {
      cb();
    }
    return pool;
  },

  disconnect: async (cb = undefined) => {
    if (cb) {
      cb();
    }
    if (pool) {
      await pool.end();
      pool = null;
    }
  },

  query: async (queryReq, params = null) => {
    if (!pool) throw new Error('CONNECTION_NOT_CREATED');
    return pool.query(queryReq, params);
  },
};
