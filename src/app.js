import express from 'express';
import db from './db/db.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import apiRouter from './routes/index.js';

const app = express();
let server;
//json
app.use(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(express.json());
//routes
app.use('/api', apiRouter);
app.use(errorHandler);

//server
export default {
  async start(port) {
    server = app.listen(port, () => {
      console.log(`Server is listening on ${port} port`);
    });
    await db.connect();
    return server;
  },
  async stop(cb = undefined) {
    console.log(`\nTrying to close the server..\n`);
    await db.disconnect(cb);
    return server.close(cb);
  },
};
