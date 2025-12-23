import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { CreateBookDto } from '@app/contracts/books/create-book.dto';
import { UpdateBookDto } from '@app/contracts/books/update-book.dto';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('books.create')
  create(@Payload() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @MessagePattern('books.findAll')
  findAll() {
    return this.booksService.findAll();
  }

  @MessagePattern('books.findOne')
  findOne(@Payload() payload: { id: number }) {
    return this.booksService.findOne(payload.id);
  }

  @MessagePattern('books.update')
  update(@Payload() updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto.id, updateBookDto);
  }

  @MessagePattern('books.remove')
  remove(@Payload() payload: { id: number }) {
    return this.booksService.remove(payload.id);
  }
}
