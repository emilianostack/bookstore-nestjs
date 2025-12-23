import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookDto } from './dto/book.dto';

@Injectable()
export class BooksService {
  private books: BookDto[] = [
    {
      id: 1,
      title: 'Title 1',
      author: 'Author 1',
      rating: 3.9,
    },
    {
      id: 2,
      title: 'Title 2',
      author: 'Author 2',
      rating: 4.7,
    },
  ];

  create(createBookDto: CreateBookDto) {
    const newBook: BookDto = {
      ...createBookDto,
      id: this.books.length + 1,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll() {
    return this.books;
  }

  findOne(id: number) {
    const bb = this.books.find((book) => book.id === id);

    console.log('XXXXX', this.books, id, bb);
    return bb;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    const index: number = this.books.findIndex((book) => book.id === id);

    if (index === -1) {
      return null;
    }
    if (
      !updateBookDto.title ||
      !updateBookDto.author ||
      !updateBookDto.rating
    ) {
      return null;
    }

    const updatedBook: BookDto = {
      id,
      title: updateBookDto.title,
      author: updateBookDto.author,
      rating: updateBookDto.rating,
    };
    this.books[index] = updatedBook;
    return updatedBook;
  }

  remove(id: number) {
    const index: number = this.books.findIndex((book) => book.id === id);
    if (index === -1) {
      return null;
    }
    const removedBook = this.books.splice(index, 1);
    return removedBook[0];
  }
}
