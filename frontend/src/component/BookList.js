import React, { useEffect, useState } from "react";

function BookList () {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/v1/book")
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching the data', error));
    }, []);
    return (
        <div>
            <h1>Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.bookId}>
                        {book.bookName} {book.authorName} - {book.availableCopies}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;