import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

//! coneción con Mongo DB

import { MongoClient } from 'mongodb';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabseModule } from './database/database.module';
import { environments } from './environments';
import config from './config';

const uri = 'mongodb://localhost:27017/';

const client = new MongoClient(uri);

const run = async () => {
  await client.connect();
  const dataBase = client.db('platzi-store');
  const tasksCollection = dataBase.collection('tasks');

  const tasks = await tasksCollection.find().toArray();

  console.log(tasks);
};

run();

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
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
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
