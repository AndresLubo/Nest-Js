import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      postgres: {
        type: process.env.POSTGRES_DATABASE_TYPE,
        name: process.env.POSTGRES_DATABASE_NAME,
        port: parseInt(process.env.POSTGRES_DATABASE_PORT),
        user: process.env.POSTGRES_DATABASE_USER,
        host: process.env.POSTGRES_DATABASE_HOST,
        password: process.env.POSTGRES_DATABASE_PASSWORD,
      },
      mongo: {
        uri: process.env.MONGO_DATABASE_URI,
        name: process.env.MONGO_DATABASE_NAME,
      },
    },
    apiKey: process.env.API_KEY,
  };
});
