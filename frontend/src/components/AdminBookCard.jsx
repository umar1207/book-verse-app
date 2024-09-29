// AdminBookCard.jsx
import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import axios from 'axios';
import UpdateBookCard from './UpdateBookCard';
import Popover from './Popover';

const AdminBookCard = ({ book, fetchBooks }) => {
    const [issuers, setIssuers] = useState([]);
    const [updateBookMenu, showUpdateBookMenu] = useState(false);
    const [message, setMessage] = useState(null);
    const [showPopover, setShowPopover] = useState(false);


    const fetchIssuers = () => {
        axios.get(`http://localhost:8080/api/v1/book/issuer/details/${book.bookId}`)
            .then(response => {
                setIssuers(response.data);
            })
            .catch(error => {
                console.error(error.response.data);
            });
    };

    useEffect(() => {
        fetchIssuers();
    }, []);

    const handleCheckboxChange = () => {
        const updatedBook = { ...book, active: !book.active };
        axios.put(`http://localhost:8080/api/v1/book/update/${book.bookId}`, updatedBook)
            .then(response => {
                console.log(updatedBook);
                console.log(response.data);
                fetchBooks();
            })
            .catch(error => {
                // console.error(error.response.data);
                setMessage(error.response.data)
                handleShowPopover();
            });
    };

    const handleDeleteClick = () => {
        axios.delete(`http://localhost:8080/api/v1/book/${book.bookId}`)
            .then(response => {
                console.log(response.data);
                fetchBooks();
            })
            .catch(error => {
                console.error('Error deleting book:', error.response.data);
                setMessage(error.response.data)
                handleShowPopover();
            });
    };

    const handleShowPopover = () => {
        setShowPopover(true);

        setTimeout(() => {
            setShowPopover(false);
        }, 1500); 
    };

    return (
        <>
            <UpdateBookCard menuOpen={updateBookMenu} setMenuOpen={showUpdateBookMenu} book={book} fetchBooks={fetchBooks} setMessage={setMessage} handleShowPopover={handleShowPopover}/>
            <Popover message={message} isVisible={showPopover}/>
            <div key={book.bookId} className={`transition-transform duration-1000 hover:scale-105 shadow-md rounded-lg overflow-hidden ${(book.active && book.availableCopies > 0) ? 'bg-white' : 'bg-neutral-300'}`} style={{ width: '15rem', height: '16rem'}}>
                <div className=''>
                    <img
                        src={book.bookPhoto}
                        alt="Book Cover"
                        className="w-full min-h-[10rem] max-h-[10rem] object-fit cursor-pointer"
                        onClick={() => showUpdateBookMenu(true)}
                    />
                </div>
                <div className="flex flex-col p-2">
                    <div className='flex flex-col'>
                        <h2 className="font-epilogue font-medium text-neutral-900">{book.bookName}</h2>
                        <p className="font-epilogue font-normal text-neutral-500">{book.authorName}</p>
                    </div>
                    <div className='flex flex-row justify-between items-center pb-5'>
                        <div>
                            <label className="flex flex-row items-center gap-1">
                                <input
                                    type="radio"
                                    value="true"
                                    checked={book.active && book.availableCopies > 0}
                                    onChange={() => handleCheckboxChange()}
                                    className="h-4 w-4"
                                />
                                <span className="text-xs">Available: {book.availableCopies}</span>
                            </label>
                        </div>
                        <div>
                            {issuers.length > 0 ? (
                                <div className='text-xs text-end'>
                                    Taken by {issuers.slice(0, -1).join(', ')} {issuers.length > 1 ? 'and ' : ''}{issuers.slice(-1)}
                                </div>
                            ) : (
                                <button
                                onClick={handleDeleteClick}
                                className="text-gray-500 py-1 rounded-lg focus:outline-none"
                                >
                                    <FaTrashAlt />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminBookCard;
