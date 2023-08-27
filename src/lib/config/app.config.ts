import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const SENTRY_DSN = process.env.SENTRY_DSN;

export const appConfig = {
  jwt: {
    secret: JWT_SECRET,
  },
  sentry: {
    dsn: SENTRY_DSN,
  },
};
