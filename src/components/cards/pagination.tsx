"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Pagination = ({
    pages,
    activePage,
    activeBadge,
    activeCat,
    activeGen,
}: {
    pages: number
    activePage: number
    activeBadge: string
    activeCat: string
    activeGen: string
}) => {
    const router = useRouter()
    const pageNumbers = []
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i)
    }

    let endpoint = "?"
    if (activeBadge !== "all") endpoint += `&badge=${activeBadge}`
    if (activeCat !== "all") endpoint += `&cat=${activeCat}`
    if (activeGen !== "all") endpoint += `&gender=${activeGen}`

    return (
        pages > 1 && (
            <div className="flex w-full justify-center gap-12">
                {activePage > 1 && (
                    <Link
                        className="cursor-pointer rounded-sm rounded-s-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        href={`/shop${endpoint}&page=${activePage - 1}`}
                    >
                        Prev
                    </Link>
                )}
                <div className="flex items-center gap-4">
                    {pageNumbers.map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            className="cursor-pointer rounded-full border border-gray-100 bg-white px-4 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                            href={`/shop${endpoint}&page=${pageNumber}`}
                        >
                            {pageNumber}
                        </Link>
                    ))}
                </div>
                {activePage < pages && (
                    <Link
                        className="cursor-pointer rounded-sm rounded-e-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        href={`/shop${endpoint}&page=${activePage + 1}`}
                    >
                        Next
                    </Link>
                )}
            </div>
        )
    )
}

export default Pagination
