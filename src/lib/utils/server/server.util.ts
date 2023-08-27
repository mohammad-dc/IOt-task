import express from 'express';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';

import {
  sentryRequestHandler,
  sentryErrorHandler,
  sentryTracingHandler,
  initSentry,
} from '../sentry/sentry.util';
import { initAppRoutes } from '../routes/routes.util';
import {
  initSocketConnection,
  socketAccessPermission,
} from '../socket/socket.util';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

export const initializeServer = () => {
  //* Sentry

  initSentry(app);
  app.use(sentryRequestHandler());
  app.use(sentryTracingHandler());
  app.use(sentryErrorHandler());

  //* Middleware
  app.use(express.json());
  app.use(morgan('dev'));

  //* Socket
  initSocketConnection(io);
  socketAccessPermission(io);

  //* Routes
  initAppRoutes(app);
};

export const appListener = (port, host) =>
  app.listen(port, host, () => console.log(`[ ready ] http://${host}:${port}`));
