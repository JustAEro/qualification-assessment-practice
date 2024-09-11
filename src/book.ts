export class Book {
    private author: string;
    private title: string;
    private publisher: string;
    private section: "special" | "fiction";
    private availability: boolean;
    private rating: number;
    private id: number;

    public constructor(
       book: BookObject
    ) {
        this.author = book.author;
        this.title = book.title;
        this.publisher = book.publisher;
        this.section = book.section;
        this.availability = book.availability;
        this.rating = book.rating;
        this.id = book.id;
    }

    public toString(): string {
        return `Id: ${this.id}, Аuthor: ${this.author}, Title: ${this.title}, Publisher: ${this.publisher}, ` +
               `Secion: ${this.section}, Availability: ${this.availability}, Rating: ${this.rating}`;
    }

    public toObject(): BookObject {
        return {
            author: this.author,
            title: this.title,
            publisher: this.publisher,
            section: this.section,
            availability: this.availability,
            rating: this.rating,
            id: this.id,
        };
    }

    public static fromObject(obj: BookObject): Book {
        return new Book(obj);
    }
}

export type BookObject = {
    id: number;
    author: string,
    title: string,
    publisher: string,
    section: "special" | "fiction",
    availability: boolean,
    rating: number,
}

export type CreateBookObject = Omit<BookObject, 'id'>;

export type SearchCriteria = Pick<BookObject, 'author' | 'section' | 'availability'>;

export type BookQuery = Partial<SearchCriteria> | undefined;