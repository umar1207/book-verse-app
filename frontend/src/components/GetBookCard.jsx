// GetBookCard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Popover from "./Popover";

function GetBookCard({ menuOpen, setMenuOpen, book, fetchBooks }) {
    const [message, setMessage] = useState(null);
    const [showPopover, setShowPopover] = useState(false);
    const [isIssued, setIsIssued] = useState(false);
    const [bookIssued, setBookIssued] = useState(false);

    const storedUserInfo = localStorage.getItem('userInfo');
    let userId = null;

    if (storedUserInfo) {
        const userInfo = JSON.parse(storedUserInfo);
        userId = userInfo.userId;
    }

    const getStatus = () => {
        if (userId == null) {
            setMessage("Invalid Session");
            return;
        }

        axios.get(`http://localhost:8080/api/v1/book/records`)
            .then(response => {
                const details = response.data.filter(x =>
                    x.userId === userId &&
                    x.bookId === book.bookId &&
                    !x.returned
                );

                if (details.length > 0) {
                    setIsIssued(true);
                    // console.log("issued");
                } else {
                    setIsIssued(false);
                    // console.log("not issued");
                }
            })
            .catch(error => {
                console.error('Error fetching book records:', error.message);
            });
    };

    useEffect(() => {
        getStatus();
    }, [bookIssued]);

    const handleIssue = () => {
        if (userId == null) {
            setMessage("Invalid session");
            handleShowPopover();
            return;
        }

        axios.post(`http://localhost:8080/api/v1/book/issue/${userId}/${book.bookId}`)
            .then(response => {
                setMessage(response.data);
                setBookIssued(!bookIssued);
                handleShowPopover();
                fetchBooks();
            })
            .catch(error => {
                setMessage(error.response.data)
                handleShowPopover();
            });
    };

    const handleReturn = () => {
        if (userId == null) {
            setMessage("Invalid session");
            return;
        }
        axios.put(`http://localhost:8080/api/v1/book/return/${userId}/${book.bookId}`)
            .then(response => {
                setMessage(response.data)
                setBookIssued(!bookIssued);
                handleShowPopover();
                fetchBooks();
            })
            .catch(error => {
                setMessage(error.response.data);
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
        <div
            style={{
                transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 1s ease"
            }}
            className="fixed inset-0 z-10 flex items-center justify-center"
        >
            <Popover message={message} isVisible={showPopover}/>
            <div className="text-black bg-slate-50 shadow-lg rounded-lg relative h-96 w-80 overflow-hidden">
                <img src={book.bookPhoto} alt={book.bookName} className="w-full h-1/2" onClick={()=>setMenuOpen(false)} />
                <div className="flex flex-col items-center text-center p-3">
                    <h1 className="text-lg text-cyan-500 font-epilogue">{book.bookName}</h1>
                    <h1 className="text-lg text-black font-epilogue font-bold">{book.authorName}</h1>
                    {isIssued && (<button className="bg-cyan-500 text-white text-sm p-2 rounded-sm mt-8"
                        onClick={handleReturn}
                    >Return this Book</button>)}
                    {!isIssued && (
                        <button className="bg-cyan-500 text-white text-sm p-2 rounded-sm mt-8"
                            onClick={handleIssue}
                        >Get this Book</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetBookCard;
