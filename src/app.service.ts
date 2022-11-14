import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    // private config: ConfigService,
    // @Inject('TASKS') private tasks: any,
    @Inject('mongo') private databaseMongo: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    @Inject('TypeORM') private clientPg: Client,
  ) {}
  getHello(): string {
    // const apiKey = this.config.get<string>('API_KEY');
    // const databaseName = this.config.get('DATABASE_NAME');

    const apiKey = this.configService.apiKey;
    const databaseName = this.configService.database.postgres.name;

    return `Hello World! ${apiKey} Database name: ${databaseName}`;
  }

  getTasks(): any {
    return new Promise((resolve, rejects) => {
      this.clientPg.query('select * from tasks', (err, res) => {
        if (err) {
          rejects({
            message: 'Ocurrió un error',
            error: err,
          });
        }

        resolve(res.rows);
      });
    });
  }

  async getTasksMongo() {
    const tasksCollection = this.databaseMongo.collection('tasks');
    const tasks = await tasksCollection.find().toArray();
    return tasks;
  }
}
