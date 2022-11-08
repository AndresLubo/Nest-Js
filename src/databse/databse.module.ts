import { Module, Global } from '@nestjs/common';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import { databaseProviders } from './database.providers';

import { DataSource } from 'typeorm';

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
    {
      provide: 'TypeORM',
      useFactory: (configService: ConfigType<typeof config>) => {
        const dataSource = new DataSource({
          type: 'postgres',
          host: configService.database.host,
          port: configService.database.port,
          username: configService.database.user,
          password: configService.database.password,
          database: configService.database.name,
        });
      },
      inject: [config.KEY],
    },
  ],
  exports: ['TypeORM', 'pg'],
})
export class DatabseModule {}
