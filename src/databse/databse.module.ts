import { Module, Global } from '@nestjs/common';
import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db',
  password: 'root',
  port: 5432,
});

client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'pg',
      useValue: client,
    },
  ],
  exports: ['pg'],
})
export class DatabseModule {}
