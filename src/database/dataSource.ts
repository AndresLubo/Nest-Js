import { DataSource } from 'typeorm';

import config from '../config';
import { ConfigType } from '@nestjs/config';

export const dataSource = {
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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
    });

    dataSource.initialize();
    return dataSource;
  },
  inject: [config.KEY],
};
