import React from "react";
import css from "./Pagination.module.css";
import clsx from "clsx";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePages = () => {
      const pages = [];
  
      const maxPagesToShow = 3;
      const visiblePages = Math.min(totalPages, maxPagesToShow);
      
      for (let i = 1; i <= visiblePages; i++) {
        pages.push(i);
      }
      
      return pages;
    };
  
    const handleClick = (page) => {
      if (page !== currentPage) {
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
            })}
            onClick={() => handleClick(page)}
          >
            {page}
          </button>
        ))}
      </nav>
    );
};
  
export default Pagination