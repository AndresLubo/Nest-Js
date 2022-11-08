import { Module, Global } from '@nestjs/common';
import config from './../config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

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
          synchronize: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        });

        dataSource.initialize();

        return dataSource;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['TypeORM', 'pg'],
})
export class DatabseModule {}
