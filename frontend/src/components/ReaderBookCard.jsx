import React, { useState } from 'react';
import GetBookCard from './GetBookCard';

const ReaderBookCard = ({ book, fetchBooks }) => {

    const [issueBookMenu, showIssueBookMenu] = useState(false);
    return (
        <>
            <GetBookCard menuOpen={issueBookMenu} setMenuOpen={showIssueBookMenu} book={book} fetchBooks={fetchBooks}/>
            {book.active && (
            <div key={book.bookId} className={`transition-transform duration-1000 hover:scale-105 shadow-md rounded-lg overflow-hidden ${(book.availableCopies > 0) ? 'bg-white' : 'bg-neutral-300'}`} style={{ width: '15rem', height: '16rem'}}>
                <div className=''>
                    <img
                        src={book.bookPhoto}
                        alt="Book Cover"
                        className="w-full min-h-[10rem] max-h-[10rem] object-fit cursor-pointer"
                        onClick={() => showIssueBookMenu(true)}
                    />
                </div>
                <div className="flex flex-col pt-6 items-center">
                    <div className='flex flex-col items-center'>
                        <h2 className="font-epilogue font-medium text-neutral-900">{book.bookName}</h2>
                        <p className="font-epilogue font-normal text-neutral-500">{book.authorName}</p>
                    </div>
                </div>
            </div>)}
        </>
    );
};

export default ReaderBookCard;