import React from "react";
import css from "./Pagination.module.css";
import clsx from "clsx";

export const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const generatePages = () => {
        const pages = [];
        const maxVisiblePages = 3;
        const halfVisible = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - halfVisible);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        pages.push(1);

        if (startPage > 2) {
            pages.push("...");
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i !== 1 && i !== totalPages) {
                pages.push(i);
            }
        }

        if (endPage < totalPages - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const handleClick = (page) => {
        if (page !== "..." && page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <nav className={css.pagination}>
            {generatePages().map((page, index) => (
                <button
                    key={index}
                    className={clsx(css.pageBtn, {
                        [css.active]: page === currentPage,
                        [css.ellipsis]: page === "...",
                    })}
                    onClick={() => handleClick(page)}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;
