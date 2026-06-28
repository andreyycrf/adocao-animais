import React from 'react'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const pages: (number | string)[] = []

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)
    if (currentPage > 3) pages.push('...')
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)
    if (currentPage < totalPages - 2) pages.push('...')
    pages.push(totalPages)
  }

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        className={styles.btn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ‹
      </button>

      {pages.map((page, index) =>
        typeof page === 'string' ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            {page}
          </span>
        ) : (
          <button
            key={page}
            className={[styles.btn, currentPage === page ? styles.active : ''].join(' ')}
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        )
      )}

      <button
        className={styles.btn}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        ›
      </button>
    </nav>
  )
}

export default Pagination
