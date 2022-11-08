import { Module, Global } from '@nestjs/common';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

import { databaseProviders } from './database.providers';

@Global()
@Module({
  providers: [
    {
      provide: 'pg',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          host: configService.database.host,
          port: configService.database.port,
          user: configService.database.user,
          password: configService.database.password,
          database: configService.database.name,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    databaseProviders,
  ],
  exports: ['TypeORM', 'pg'],
})
export class DatabseModule {}
