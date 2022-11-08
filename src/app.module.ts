import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { Client } from 'pg';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { firstValueFrom } from 'rxjs';
import { DatabseModule } from './databse/databse.module';
import { environments } from './environments';
import config from './config';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'my_db',
  password: 'root',
  port: 5432,
});

client.connect();
client.query('select * from tasks', (err, res) => {
  if (err) {
    console.error(err);
    return false;
  }

  console.log(res.rows);
});

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
