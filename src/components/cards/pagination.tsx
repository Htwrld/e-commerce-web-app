"use client"

import { useState } from "react"

const Pagination = ({
    pages,
    handlePageChange,
}: {
    pages: number
    handlePageChange: (page: number) => Promise<void>
}) => {
    const [activePage, setActivePage] = useState(1)
    const pageNumbers = []
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i)
    }

    const handlePageClick = async (pageNumber: number) => {
        if (pageNumber === 0) return
        if (pageNumber > pages) return
        await handlePageChange(pageNumber)
        setActivePage(pageNumber)
    }

    return (
        pages > 1 && (
            <div className="flex w-full justify-center gap-12">
                {activePage > 1 && (
                    <button
                        className="cursor-pointer rounded-sm rounded-s-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        disabled={activePage === 1}
                        onClick={() => handlePageClick(activePage - 1)}
                    >
                        Prev
                    </button>
                )}
                <div className="flex items-center gap-4">
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className="cursor-pointer rounded-full border border-gray-100 bg-white px-4 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                            disabled={pageNumber === activePage}
                            onClick={() => handlePageClick(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
                {activePage < pages && (
                    <button
                        className="cursor-pointer rounded-sm rounded-e-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        disabled={activePage === pages}
                        onClick={() => handlePageClick(activePage + 1)}
                    >
                        Next
                    </button>
                )}
            </div>
        )
    )
}

export default Pagination
