import { DataSource } from 'typeorm';

import config from './../config';
import { ConfigType } from '@nestjs/config';

export const databaseProviders = {
  provide: 'TypeORM',
  useFactory: (configService: ConfigType<typeof config>) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.database.host,
      port: configService.database.port,
      username: configService.database.user,
      password: configService.database.password,
      database: configService.database.name,
      synchronize: false,
      logging: true,
      entities: ['src/**/*.entity{.ts,.js}'],
      migrations: ['src/database/migrations/*.ts'],
    });

    dataSource.initialize();
    return dataSource;
  },
  inject: [config.KEY],
};
