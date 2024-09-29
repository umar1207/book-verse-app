import React from 'react';
import { IoMdLogOut } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
// import { useHistory } from 'react-router-dom'; // If using React Router for navigation

const Navbar = () => {
    const storedUserInfo = localStorage.getItem('userInfo');
    let userName = null;
    let userRoleName = null;

    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        userName = userInfo.userName;
        userRoleName = userInfo.userRoleName;
    }

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/user/logout');
            localStorage.removeItem('userInfo');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav className="bg-black p-2">
            <div className="mx-5 flex justify-between items-center">
                <div className="flex items-center">
                    <span className="text-white text-lg font-semibold">BookVerse</span>
                </div>
                <Dropdown>
                    <Dropdown.Toggle
                        id="dropdown-basic"
                        className="bg-transparent border-0 text-white d-flex align-items-center"
                        style={{
                            boxShadow: 'none',
                            padding: 0,
                            fontSize: '1rem',
                            cursor: 'pointer',
                        }}
                    >
                        <div className='flex flex-row items-center gap-3'>
                            <h1 className='font-mono'>Hi {userName}</h1>
                            <FaRegUserCircle size={24} />
                        </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-gray-800 text-white rounded-lg shadow-lg flex flex-col p-3">
                        {userRoleName === 'Admin' && (
                            <>
                                <Dropdown.Item className="text-white hover:bg-gray-800 hover:text-white" href='/reader/books'>
                                    Issue Book
                                </Dropdown.Item>
                                <Dropdown.Item className="text-white hover:bg-gray-800 hover:text-white" href='/admin/books'>
                                    Manage Books
                                </Dropdown.Item>
                                <Dropdown.Item className="text-white hover:bg-gray-800 hover:text-white" href='/admin/records'>
                                    View Audits
                                </Dropdown.Item>
                            </>
                        )}
                        <Dropdown.Item onClick={handleLogout} className="text-red-400 flex items-center gap-2 hover:bg-gray-800 hover:text-red-400">
                            <IoMdLogOut />
                            <span>Logout</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

            </div>
        </nav>
    );
};

export default Navbar;