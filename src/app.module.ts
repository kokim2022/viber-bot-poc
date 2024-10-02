import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/main';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
