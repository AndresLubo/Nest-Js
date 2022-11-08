import { Module, Global } from '@nestjs/common';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'my_db',
//   password: 'root',
//   port: 5432,
// });

// client.connect();

@Global()
@Module({
  providers: [
    {
      provide: 'pg',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          user: configService.database.user,
          host: configService.database.host,
          database: configService.database.name,
          password: configService.database.password,
          port: configService.database.port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['pg'],
})
export class DatabseModule {}
