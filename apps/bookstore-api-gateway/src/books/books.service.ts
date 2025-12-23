import { CreateBookDto } from '@app/contracts/books/create-book.dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  BOOKS_PATTERNS,
  BookDto as ClientBookDto,
  CreateBookDto as ClientCreateBookDto,
  UpdateBookDto as UpdateClientBookDto,
} from '@app/contracts/books';
import { ClientProxy } from '@nestjs/microservices';
import { BOOKS_CLIENT } from './constants';

@Injectable()
export class BooksService {
  constructor(@Inject(BOOKS_CLIENT) private booksClient: ClientProxy) {}

  create(createBookDto: CreateBookDto) {
    return this.booksClient.send<ClientBookDto, ClientCreateBookDto>(
      BOOKS_PATTERNS.CREATE,
      createBookDto,
    );
  }

  findAll() {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.FIND_ONE, {
      id,
    });
  }

  update(id: number, updateBookDto: UpdateClientBookDto) {
    return this.booksClient.send<ClientBookDto, UpdateClientBookDto>(
      BOOKS_PATTERNS.UPDATE,
      { ...updateBookDto, id },
    );
  }

  remove(id: number) {
    return this.booksClient.send<ClientBookDto>(BOOKS_PATTERNS.REMOVE, { id });
  }
}
