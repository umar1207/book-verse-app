import React, { useState } from 'react';
import axios from 'axios';

function UpdateBookCard({ menuOpen, setMenuOpen, book, fetchBooks, setMessage, handleShowPopover }) {
    const [formData, setFormData] = useState({
        bookName: book.bookName,
        authorName: book.authorName || '',
        genre: book.genre || '',
        totalCopies: book.totalCopies || 0,
        active: book.active || false,
        bookPhoto: book.bookPhoto || ''
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'bookPhoto') {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: reader.result,  // Set base64 string
                }));
                console.log(reader.result)
            };
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            authorName: formData.authorName,
            genre: formData.genre,
            totalCopies: parseInt(formData.totalCopies),
            active: formData.active,
            bookPhoto: formData.bookPhoto
        };

        console.log('Payload:', payload);

        axios.put(`http://localhost:8080/api/v1/book/update/${book.bookId}`, payload)
            .then(response => {
                console.log('Book updated successfully:', response.data);
                fetchBooks();
            })
            .catch(error => {
                console.error('Error updating book:', error.response.data);
                setMessage(error.response.data);
                handleShowPopover();
            });
    };



    return (
        <div
            style={{
                transform: menuOpen ? "translateY(0)" : "translateY(-200%)",
                transition: "transform 1s ease"
            }}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <div className="text-black bg-slate-50 shadow-lg rounded-lg relative w-80 h-[35rem] overflow-hidden">
                <img src={book.bookPhoto} alt={book.bookName} className="w-full h-2/6 border border-slate-700 rounded-t-lg" />
                <div className="flex flex-col items-center text-center py-2">
                    <div className='flex flex-col items-center'>
                        <h2 className="text-xl font-bold">Update Book Details</h2>
                        <h3 className='text-lg font-normal'>Name: {formData.bookName}</h3>
                    </div>
                </div>
                <div className='px-4'>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">By</label>
                            <input
                                type="text"
                                id="authorName"
                                name="authorName"
                                value={formData.authorName}
                                onChange={handleChange}
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
                            <input
                                type="text"
                                id="genre"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="totalCopies" className="block text-sm font-medium text-gray-700">Total Copies</label>
                            <input
                                type="number"
                                id="totalCopies"
                                name="totalCopies"
                                value={formData.totalCopies}
                                onChange={handleChange}
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="active" className="block text-sm font-medium text-gray-700">Active</label>
                            <select
                                id="active"
                                name="active"
                                value={formData.active}
                                onChange={handleChange}
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            >
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                            </select>
                        </div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="bookPhoto" className="block text-sm font-medium text-gray-700">Image </label>
                            <input
                                type="file"
                                id="bookPhoto"
                                name="bookPhoto"
                                onChange={handleChange}
                                accept="image/*"
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <div className='flex justify-center mt-3'>
                            <button type="submit" className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-3/4" onClick={() => setMenuOpen(false)}>
                                Update Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateBookCard;
