import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ColinhaService } from './colinha.service';
import { EntradaColinha } from './colinha.types';

@Controller('colinhas')
export class ColinhaController {
  constructor(private readonly colinhas: ColinhaService) {}

  @Post()
  criar(@Body() entrada: EntradaColinha) {
    return this.colinhas.criar(entrada ?? {});
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.colinhas.buscar(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() entrada: EntradaColinha) {
    return this.colinhas.atualizar(id, entrada ?? {});
  }
}
