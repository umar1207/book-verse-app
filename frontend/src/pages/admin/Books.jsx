import React, { useEffect, useState } from 'react';
import AdminBookCard from '../../components/AdminBookCard';

import { GoPlus } from 'react-icons/go';
import Navbar from '../../components/Navbar';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import AddBookCard from '../../components/AddBookCard';
import UnauthorizedPage from '../../components/UnauthorizedPage';
const AdminBooks = () => {

    const [addBookMenu, showAddBookMenu] = useState(false);
    const [books, setBooks] = useState([]);
    const [query, setSearchQuery] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Check user role on component mount
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const userInfo = JSON.parse(storedUserInfo);
            setIsAdmin(userInfo.userRoleName === 'Admin');
        } else {
            setIsAdmin(false);
        }
    }, []);


    // Function to fetch books based on a search query
    const fetchBooks = async () => {
        axios.get(`http://localhost:8080/api/v1/book${query ? `/search?searchTerm=${query}` : ''}`)
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                console.error("ERROR! ", error);
            });
    };

    useEffect(() => {
        if (isAdmin) {
            fetchBooks();
        }
    }, [query, isAdmin]);

    if (!isAdmin) {
        return <UnauthorizedPage />;
    }

    return (
        <>
            <AddBookCard menuOpen={addBookMenu} setMenuOpen={showAddBookMenu} fetchBooks={fetchBooks} />
            <div className="bg-gray-100 flex flex-col h-[100vh]">
                <Navbar />
                <div className='flex-end mx-auto max-w-4xl min-w-sm'>
                    <div className="flex flex-col md:flex-row md:justify-between items-center my-2 p-3 max-w-3xl min-w-sm mx-auto gap-3">
                        <div>
                            <h1 className="text-lg font-bold">Admin Page</h1>
                        </div>
                        <div>
                            <SearchBar query={query} setSearchQuery={setSearchQuery} />
                        </div>
                    </div>
                    <div className="overflow-auto max-h-[71vh] md:max-h-[75vh] no-scrollbar">
                        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
                            {books.map(book => (
                                <div key={book.bookId}>
                                    <AdminBookCard book={book} fetchBooks={fetchBooks} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mx-3 text-cyan-500'>
                    <button onClick={() => showAddBookMenu(true)}><GoPlus className='text-5xl' S /></button>
                </div>
            </div>
        </>
    );
}

export default AdminBooks;