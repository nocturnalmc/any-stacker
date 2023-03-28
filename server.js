// CORE
import * as dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
import helmet from 'helmet';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// MIDDLEWARE
import moeisAuth from './middlewares/moeisAuth.js';

// ROUTER
import moeis from './routes/moeis.js';

// LET'S GO
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('trust proxy', 1);
app.disable('x-powered-by');

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(express.json({ limit: '50mb' }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// mimicking MOEIS integration
app.use('/api/v1/moeis', moeisAuth, moeis);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// not found
app.use((req, res) => {
  res.status(404).json({ msg: 'Error: 404, route does not exist' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Nope' });
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
