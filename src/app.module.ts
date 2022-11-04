import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DatabseModule } from './databse/databse.module';

@Module({
  imports: [UsersModule, ProductsModule, HttpModule, DatabseModule],
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
