import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks: any,
  ) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }

  getTasks(): any {
    return this.tasks;
  }
}
