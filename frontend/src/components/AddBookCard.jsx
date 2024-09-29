// AddBookCard.jsx
import axios from "axios";
import { useState } from "react";

function AddBookCard({ menuOpen, setMenuOpen, fetchBooks }) {
    const [formData, setFormData] = useState({
        bookName: '',
        authorName: '',
        genre: '',
        totalCopies: 0,
        bookPhoto: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'bookPhoto') {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: reader.result,
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

        const reqbody = {
            bookName: formData.bookName,
            authorName: formData.authorName,
            genre: formData.genre,
            totalCopies: parseInt(formData.totalCopies),
            bookPhoto: formData.bookPhoto  // Base64 string
        };

        axios.post('http://localhost:8080/api/v1/book', reqbody)
            .then(response => {
                console.log('Book added successfully:', response.data);
                setFormData({
                    bookName: '',
                    authorName: '',
                    genre: '',
                    totalCopies: 0,
                    bookPhoto: ''
                });
                fetchBooks();
            })
            .catch(error => {
                console.error('Error adding book:', error.response.data);
            });
    };

    return (
        <div
            style={{
                transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 1s ease"
            }}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <div className="text-black bg-slate-50 shadow-lg rounded-lg relative w-80 h-96 overflow-hidden">
                <div className="flex flex-col items-center text-center pt-3">
                    <div className='flex flex-col items-center'>
                        <h2 className="text-xl font-bold">Add Book Details</h2>
                    </div>
                </div>
                <div className='p-4'>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="bookName" className="block text-sm font-medium text-gray-700">Book Name</label>
                            <input
                                type="text"
                                id="bookName"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleChange}
                                required
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
                        </div>
                        <div className="flex flex-row items-center gap-3 justify-between">
                            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">By</label>
                            <input
                                type="text"
                                id="authorName"
                                name="authorName"
                                value={formData.authorName}
                                onChange={handleChange}
                                required
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
                                required
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
                                required
                                className='w-2/3 px-2 py-1 border border-gray-300 rounded-lg text-sm font-medium text-center focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                            />
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
                            <button type="submit" className="bg-cyan-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/2 mt-4" onClick={() => setMenuOpen(false)}>
                                Save Book
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBookCard;