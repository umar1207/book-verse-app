import React from 'react';
import { FaLock } from 'react-icons/fa';

const UnauthorizedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <FaLock className="text-red-500 text-6xl mb-4 mx-auto" />
                <h1 className="text-3xl font-bold text-gray-800">Unauthorized Access</h1>
                <p className="text-gray-600 mt-2">
                    You do not have permission to view this page.
                </p>
                <a
                    href="/"
                    className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Go Back to Home
                </a>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
