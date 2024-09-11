import * as fs from 'fs';

import { Book, BookObject, BookQuery, CreateBookObject, SearchCriteria } from "./book";

export class Catalog {
    private books: Book[] = [];

    public searchBooks(query?: BookQuery): Book[] {
        return this.books.filter(book => {
            const bookObject = book.toObject();

            if (query === undefined) {
                return true;
            }

            const searchKeys: (keyof SearchCriteria)[] = [];

            if ('author' in query) {
                searchKeys.push('author');
            }

            if ('section' in query) {
                searchKeys.push('section');
            }
            
            if ('availability' in query) {
                searchKeys.push('availability')
            }

            if (searchKeys.length === 0) {
                return true;
            }

            return searchKeys.every(key => bookObject[key] === query[key])
        });
    }

    public editBook(newBook: Book): void {
        const bookIndex = this.books.findIndex(book => book.toObject().id === newBook.toObject().id);

        if (bookIndex === -1) {
            console.log('Book not found');
            return;
        }

        this.books[bookIndex] = newBook;
    }

    public addBook(bookObject: CreateBookObject): void {
        const newBook = new Book({
            ...bookObject,
            id: Math.floor(Math.random() * 1_000_000),
        });

        this.books.push(newBook);
    }

    public removeBook(id: BookObject['id']): void {
        this.books = this.books.filter(book => book.toObject().id !== id);
    }

    public saveToFile(filename: string): void {
        fs.writeFileSync(filename, JSON.stringify(this.books.map(book => book.toObject())));
    }

    public readFromFile(filename: string): void {
        let data: string;

        try {
            data = fs.readFileSync(filename, 'utf-8');
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
                console.log('File not found!');
                return;
            } else {
                throw error;
            }
        }

        this.books = JSON.parse(data).map((bookData: BookObject) => Book.fromObject(bookData));
    }
}