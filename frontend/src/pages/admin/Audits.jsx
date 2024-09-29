import axios from "axios";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import Navbar from "../../components/Navbar";
import UnauthorizedPage from "../../components/UnauthorizedPage";

const Audits = () => {
    const [audits, setAudits] = useState([]);
    const [bookSearched, setBookSearched] = useState('');
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

    // Fetch audits from API
    const fetchAudits = () => {
        axios.get(`http://localhost:3000/api/v1/book/records`)
            .then(response => {
                setAudits(response.data);
            })
            .catch(error => {
                console.error(error.response ? error.response.data : error.message);
            });
    };

    // Use useEffect to fetch data when component mounts
    useEffect(() => {
        fetchAudits();
    }, [isAdmin]); // Empty dependency array ensures this runs only on mount

    if (!isAdmin) {
        return <UnauthorizedPage />;
    }


    // Separate and sort the audits
    const sortAudits = (audits) => {
        const notReturned = audits.filter(x => !x.returnDate);
        const returned = audits.filter(x => x.returnDate);

        return [...notReturned, ...returned];
    };

    // Compute reversed and sorted audits
    const sortedAudits = sortAudits([...audits].reverse());

    // Filter audits based on search query
    const filteredAudits = sortedAudits.filter(x =>
        x.bookName && x.bookName.toLowerCase().startsWith(bookSearched.toLowerCase())
    );

    return (
        <div className="bg-gray-200 min-h-screen">
            <Navbar />
            <div className="max-w-2xl min-w-sm mx-auto">
                {/* <SearchBar query={bookSearched} setSearchQuery={setBookSearched} /> */}
                <div className="sticky top-0 bg-gray-200 z-10 p-3">
                    <SearchBar query={bookSearched} setSearchQuery={setBookSearched} />
                </div>
                <div className="flex max-h-[75vh] overflow-auto no-scrollbar">

                    <table className="w-full bg-white border text-xs">
                        <thead className="bg-slate-700 text-white">
                            <tr>
                                <th className="p-1 w-36">Book Name</th>
                                <th className="p-1 w-20">Issued To</th>
                                <th className="p-1 w-24">Issued On</th>
                                <th className="p-1 w-24">Return By</th>
                                <th className="p-1 w-24">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAudits.map(x => (
                                <tr key={x.issueId} className="border-b">
                                    <td className="p-1">{x.bookName}</td>
                                    <td className="p-1">{x.userName}</td>
                                    <td className="p-1">{x.issueDate}</td>
                                    <td className="p-1">{x.returnDate}</td>
                                    <td className="p-1">
                                        {x.returned ? (
                                            <span className="text-lime-400 font-medium">Returned</span>
                                        ) : (
                                            <span className="text-red-500 font-medium">Not Returned</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Audits;

