import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';

@Module({
  imports: [BooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksAppModule {}
