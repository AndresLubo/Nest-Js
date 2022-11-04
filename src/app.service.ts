import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('API_KEY') private apiKey: string) {}
  getHello(): string {
    return `Hello World! ${this.apiKey}`;
  }
}
