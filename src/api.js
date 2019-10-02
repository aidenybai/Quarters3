import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import globalRoute from './controllers/index.js';
import connect from './db/connection.js';
import path from 'path';

const app = express();
const db = connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true }
);

export default class API {
  constructor(options = {}) {
    this.options = options;
  }

  start(port = this.options.port || process.env.PORT || 3000) {
    app.enable('trust proxy', true);

    app.disable('view cache');
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, './../views'));

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(compression());
    app.use(cors());
    app.use(
      rateLimit({
        windowMs: 10000,
        max: 50,
        headers: true,
        handler: (_req, res) => {
          res.status(429).json({ code: 429, message: 'Too many requests' });
        },
      })
    );

    app.use(express.static('public'));
    app.use(globalRoute);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  }
}