import { Module, Global } from '@nestjs/common';
import config from '../config';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';

//! coneción con Mongo DB
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

import { dataSource } from './dataSource';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const retorno = {
          uri: configService.database.mongo.uri,
          dbName: configService.database.mongo.name,
        };

        return retorno;
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'pg',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          host: configService.database.postgres.host,
          port: configService.database.postgres.port,
          user: configService.database.postgres.user,
          password: configService.database.postgres.password,
          database: configService.database.postgres.name,
        });

        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
    dataSource,
    {
      provide: 'mongo',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const client = new MongoClient(configService.database.mongo.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        await client.connect();

        const database = client.db(configService.database.mongo.name);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['TypeORM', 'pg', 'mongo', MongooseModule],
})
export class DatabseModule {}
