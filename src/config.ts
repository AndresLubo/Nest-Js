import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      port: parseInt(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
    },
    apiKey: process.env.API_KEY,
  };
});
