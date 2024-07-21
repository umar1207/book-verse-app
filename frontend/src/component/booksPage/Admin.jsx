import React, { useEffect, useState } from 'react';
// import BookCard from '../book/BookCard';
const Admin = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/book')  // Replace with your actual API endpoint
            .then(response => response.json())
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-100 mt-5">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">For you</h1>
            </div>
            <div id="books-container" className="grid grid-cols-3 gap-4">
                {books.map(book => (
                    // <div className='hover:scale-110'>
                        <div key={book.bookId} className={`transition-transform duration-500 hover:scale-110 bg-white shadow-md rounded-lg overflow-hidden ${book.active ? 'bg-green-200' : 'bg-red-200'}`}>
                            <img
                                src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvam9iNjgyLTI0NS1wLnBuZw.png"
                                alt="Book Cover"
                                className="w-full"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-bold">{book.bookName}</h2>
                                <p className="text-gray-600">{book.authorName}</p>
                            </div>
                        </div>
                    // </div>
                ))}
            </div>
        </div>
    );
}

export default Admin;
