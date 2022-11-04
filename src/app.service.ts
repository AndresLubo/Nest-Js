import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService,
    @Inject('TASKS') private tasks: any,
  ) {}
  getHello(): string {
    const apiKey = this.config.get<string>('API_KEY');
    const databaseName = this.config.get('DATABASE_NAME');

    return `Hello World! ${apiKey} Database name: ${databaseName}`;
  }

  getTasks(): any {
    return this.tasks;
  }
}
