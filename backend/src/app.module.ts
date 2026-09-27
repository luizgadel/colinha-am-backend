import { Module } from '@nestjs/common';
import { ColinhaModule } from './colinha/colinha.module';

@Module({
  imports: [ColinhaModule],
})
export class AppModule {}
