import * as readlineSync from 'readline-sync';
import { Book, BookObject, BookQuery } from './book';
import { Catalog } from './catalog';

function main() {
    const catalog = new Catalog();

    while (true) {
        console.log("\n1. Add book");
        console.log("2. Remove book");
        console.log("3. Edit book");
        console.log("4. Search books");
        console.log("5. Save books to a file");
        console.log("6. Read books from a file");
        console.log("7. Show books")
        console.log("8. Quit");

        const choice = readlineSync.question("Check action: ");

        switch (choice) {
            case '1': {
                const author = readlineSync.question("Author: ");
                const title = readlineSync.question("Title: ");
                const publisher = readlineSync.question("Publisher: ");
                const section = readlineSync.question("Section (special/fiction): ");

                let sectionToPass: BookObject['section'];
                if (section === 'special') {
                    sectionToPass = 'special';
                } else if (section === 'fiction') {
                    sectionToPass = 'fiction';
                } else {
                    console.log("Wrong choice. Please, try again.");
                    break;
                }

                const availability = readlineSync.question("Availability (y/n): ") === 'y';
                const rating = Number(readlineSync.question("Rating: "));

                catalog.addBook({author, title, publisher, section: sectionToPass, availability, rating});
                break;
            }
            case '2': {
                const booksList = catalog.searchBooks({});

                booksList.forEach(book => {
                    console.log(book.toString());
                })

                const id = Number(readlineSync.question("Id of book to remove: "));
                
                catalog.removeBook(id);
                break;
            }
            case '3': {
                const booksList = catalog.searchBooks({});

                booksList.forEach(book => {
                    console.log(book.toString());
                })

                const id = Number(readlineSync.question("Id of book to be edited: "));
                const newAuthor = readlineSync.question("New author: ");
                const newTitle = readlineSync.question("New title: ");
                const newPublisher = readlineSync.question("New publisher: ");
                const newSection = readlineSync.question("New section (special/fiction): ");

                let sectionToPass: BookObject['section'];
                if (newSection === 'special') {
                    sectionToPass = 'special';
                } else if (newSection === 'fiction') {
                    sectionToPass = 'fiction';
                } else {
                    console.log("Wrong choice. Please, try again.");
                    break;
                }

                const newAvailability = readlineSync.question("New availability (y/n): ");
                const newRating = Number(readlineSync.question("New rating: "));

                catalog.editBook(Book.fromObject({
                    id,
                    author: newAuthor, 
                    title: newTitle, 
                    publisher: newPublisher, 
                    section: sectionToPass, 
                    availability: newAvailability === 'y', 
                    rating: newRating
                }));

                break;
            }
            case '4': {
                let searchCriteria: BookQuery = {};
                console.log("Enter search criteria (leave empty to skip):");
                const author = readlineSync.question("Author: ");
                if (author) searchCriteria['author'] = author;
               
                const section = readlineSync.question("Section: ");
                let sectionToPass: BookObject['section'];
                if (section === 'special') {
                    sectionToPass = 'special';
                    searchCriteria['section'] = sectionToPass;
                } else if (section === 'fiction') {
                    sectionToPass = 'fiction';
                    searchCriteria['section'] = sectionToPass;
                } else {
                    console.log("Wrong choice. Section will be considered as skipped.");
                }

                const availability = readlineSync.question("Availability: ");
                if (availability) searchCriteria['availability'] = availability === 'y';

                const results = catalog.searchBooks(searchCriteria);
                results.forEach(book => console.log(book.toString()));
                break;
            }
            case '5': {
                const filename = readlineSync.question("File name to save books: ");
                catalog.saveToFile(filename);
                break;
            }
            case '6': {
                const filename = readlineSync.question("File name to load books from: ");
                catalog.readFromFile(filename);
                break;
            }
            case '7': {
                const results = catalog.searchBooks();
                results.forEach(book => console.log(book.toString()));
                break;
            }
            case '8': {
                return;
            }
            default: {
                console.log("Wrong choice. Please, try again.");
            }
        }
    }
}

main();
