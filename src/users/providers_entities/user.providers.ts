import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export const userProviders = {
  provide: 'user_repository',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
  inject: ['TypeORM'],
};
