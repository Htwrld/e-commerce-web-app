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

    let endpoint = ""
    if (activeBadge && activeBadge !== "all") endpoint += `&badge=${activeBadge}`
    if (activeCat && activeCat !== "all") endpoint += `&cat=${activeCat}`
    if (activeGen && activeGen !== "all") endpoint += `&gender=${activeGen}`

    return (
        pages > 1 && (
            <div className="flex w-full justify-center gap-12">
                {activePage > 1 && (
                    <Link
                        className="cursor-pointer rounded-sm rounded-s-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        href={`/shop?page=${activePage - 1}${endpoint}`}
                    >
                        Prev
                    </Link>
                )}
                <div className="flex items-center gap-4">
                    {pageNumbers.map((pageNumber) => (
                        <Link
                            key={pageNumber}
                            className={`flex cursor-pointer items-center justify-center rounded-full border border-gray-100 ${pageNumber === activePage ? "bg-amber-800 text-white" : "bg-white text-black"} px-4 py-2 font-medium transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300`}
                            href={`/shop?page=${pageNumber}${endpoint}`}
                        >
                            {pageNumber}
                        </Link>
                    ))}
                </div>
                {activePage < pages && (
                    <Link
                        className="cursor-pointer rounded-sm rounded-e-full border border-gray-100 bg-white px-12 py-2 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:text-gray-800 disabled:bg-gray-300"
                        href={`/shop?page=${activePage + 1}${endpoint}`}
                    >
                        Next
                    </Link>
                )}
            </div>
        )
    )
}

export default Pagination
