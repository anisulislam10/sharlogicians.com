// Pagination.jsx
import React from "react";
import "./../styles/Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="pagination">
            <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    className={currentPage === i + 1 ? "active" : ""}
                    onClick={() => handleClick(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
            <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
