import 'dotenv/config';
import API from './api.js';

const api = new API({ port: process.env.PORT });

api.start();