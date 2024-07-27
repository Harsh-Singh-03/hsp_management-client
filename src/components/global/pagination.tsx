import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useEffect, useState } from "react";

interface props{
    isPrev: boolean;
    isNext: boolean;
    totalPages: number;
    currentPage: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

export const PaginationComponent = ({isPrev, isNext, totalPages, currentPage, setPage, page }: props) => {

    const onPageChange = (num: number) => {
        setPage(num)
        console.log(num)
    }

    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious size='default' role="button" onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1 )} />
                    </PaginationItem>
                )}
                {Array.from({length: totalPages}).map((_, j) => (
                    <PaginationItem key={j}>
                        <PaginationLink size='default' role='button' isActive={currentPage === j + 1} onClick={() => onPageChange(j + 1)}>
                            {j + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {/* {totalPages > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )} */}
                {currentPage < totalPages && (
                    <PaginationItem>
                        <PaginationNext role="button" size='default' onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages )} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>

    )
}