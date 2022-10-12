import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
        options: { 
          host: 'local-nest-communication', 
          port: 3021,
         },
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: { 
          host: 'local-nest-analytics',
          port: 3022,
         },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
