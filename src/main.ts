import express from 'express';
import morgan from 'morgan';
import { deviceRoute } from './modules/resources/device/device.module';
import { userRoute } from './modules/resources/user/user.module';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

/**
 * TODO: needs to add sentry for errors
 * TODO: add socket
 *
 */
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/devices', deviceRoute.router);
app.use('/api/v1/users', userRoute.router);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
