import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReaderBookCard from '../../components/ReaderBookCard';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
const ReaderBooks = () => {
    const [books, setBooks] = useState([]);
    const [query, setSearchQuery] = useState('');

    const fetchBooks = async () => {
        axios.get(`http://localhost:8080/api/v1/book${query ? `/search?searchTerm=${query}` : ''}`)
            .then(response => {
                setBooks(response.data.filter(book => book.active));
            })
            .catch(error => {
                console.error("ERROR! ", error);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, [query]);

    return (
        <>
            <div className="bg-gray-100 flex flex-col h-[100vh]">
                <Navbar/>
                <div className='flex-end mx-auto max-w-4xl min-w-sm'>
                    <div className="flex flex-col md:flex-row md:justify-between items-center my-2 p-3 max-w-3xl min-w-sm mx-auto gap-3">
                        <div>
                            <h1 className="text-lg font-bold">For you</h1>
                        </div>
                        <div>
                            <SearchBar query={query} setSearchQuery={setSearchQuery} />
                        </div>
                    </div>
                    <div className='overflow-auto no-scrollbar max-h-[80vh]'>
                        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                            {books.map(book => (
                                <div key={book.bookId}>
                                    <ReaderBookCard book={book} fetchBooks={fetchBooks} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReaderBooks;