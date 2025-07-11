import React from "react";
import css from "./Pagination.module.css";
import clsx from "clsx";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePages = () => {
      const pages = [];
  
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
  
        if (currentPage > 3) pages.push("...");
  
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
  
        for (let i = start; i <= end; i++) pages.push(i);
  
        if (currentPage < totalPages - 2) pages.push("...");
  
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
  
export default Pagination