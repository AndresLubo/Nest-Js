import { DataSource } from 'typeorm';

import config from '../config';
import { ConfigType } from '@nestjs/config';

export const dataSource = {
  provide: 'TypeORM',
  useFactory: (configService: ConfigType<typeof config>) => {
    const dataSource = new DataSource({
      type: 'postgres',
      host: configService.database.postgres.host,
      port: configService.database.postgres.port,
      username: configService.database.postgres.user,
      password: configService.database.postgres.password,
      database: configService.database.postgres.name,
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
