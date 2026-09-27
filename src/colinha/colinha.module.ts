import { Module } from '@nestjs/common';
import { ColinhaController } from './colinha.controller';
import { ColinhaRepository } from './colinha.repository';
import { ColinhaService } from './colinha.service';

@Module({
  controllers: [ColinhaController],
  providers: [ColinhaService, ColinhaRepository],
})
export class ColinhaModule {}
