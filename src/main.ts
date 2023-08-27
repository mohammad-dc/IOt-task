import { appListener, initializeServer } from './lib/utils/server/server.util';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

initializeServer();
appListener(port, host);
