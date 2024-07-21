import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div key={book.bookId} className={`bg-white shadow-md rounded-lg overflow-hidden ${book.active ? 'bg-green-200' : 'bg-red-200'}`}>
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
    );
};

export default BookCard;
