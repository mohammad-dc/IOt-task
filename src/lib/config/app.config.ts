import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const appConfig = {
  jwt: {
    secret: JWT_SECRET,
  },
};
