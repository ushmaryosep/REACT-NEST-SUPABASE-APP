import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { JournalService } from './journal.service';

@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post()
  create(@Body() body: any) {
    return this.journalService.create(body);
  }

  @Get()
  findAll() {
    return this.journalService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.journalService.delete(id);
  }
}