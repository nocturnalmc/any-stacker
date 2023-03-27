// CORE
import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';

// MIDDLEWARE
import moeisAuth from './middlewares/moeisAuth.js';

// ROUTER
import moeis from './routes/moeis.js';

// LET'S GO
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// mimicking MOEIS integration
app.use('/api/v1/moeis', moeisAuth, moeis);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Nope' });
});

// not found
app.use((req, res) => {
  res.status(404).json({ msg: 'Error: 404, route does not exist' });
});

// SERVER ------------------------------------------------------
const port = process.env.PORT || 5005;

const start = async () => {
  try {
    app.listen(
      port,
      console.log(`[server] Server is listening at port: ${port}. Lessgo!`)
    );
    // display application version number everytime server start
    console.log('[server] v' + process.env.npm_package_version);
  } catch (error) {
    console.log(error);
  }
};

start();
