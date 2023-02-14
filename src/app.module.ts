import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabseModule } from './database/database.module';
import { environments } from './environments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabseModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        POSTGRES_DATABASE_NAME: Joi.string().required(),
        POSTGRES_DATABASE_PORT: Joi.number().required(),
        POSTGRES_DATABASE_HOST: Joi.string().required(),
        POSTGRES_DATABASE_USER: Joi.string().required(),
        POSTGRES_DATABASE_PASSWORD: Joi.string().required(),
        MONGO_DATABASE_URI: Joi.string().required(),
        MONGO_DATABASE_NAME: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const response = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
        );

        const tasks = await (await firstValueFrom(response)).data;
        return tasks;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
