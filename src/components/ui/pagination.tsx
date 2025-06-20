'use client';

import {
	Pagination as PaginationContainer,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/registry/new-york-v4/ui/pagination';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
	totalPages: number;
};

export function Pagination({ totalPages }: Props) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const currentPage = Number(searchParams.get('page')) || 1;

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams);
		params.set('page', pageNumber.toString());
		return `${pathname}?${params.toString()}`;
	};

	const pagination = generatePagination(currentPage, totalPages);
	const hasNextPage = currentPage < totalPages;
	const hasPreviousPage = currentPage > 1;

	return (
		<PaginationContainer>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={createPageURL(currentPage - 1)}
						aria-disabled={!hasPreviousPage}
						tabIndex={!hasPreviousPage ? -1 : undefined}
					/>
				</PaginationItem>
				{pagination.map((page, index) =>
					typeof page === 'number' ? (
						<PaginationItem key={index}>
							<PaginationLink href={createPageURL(page)} isActive={currentPage === page}>
								{page}
							</PaginationLink>
						</PaginationItem>
					) : (
						<PaginationEllipsis key={index} />
					)
				)}
				<PaginationItem>
					<PaginationNext
						href={createPageURL(currentPage + 1)}
						aria-disabled={!hasNextPage}
						tabIndex={!hasNextPage ? -1 : undefined}
					/>
				</PaginationItem>
			</PaginationContent>
		</PaginationContainer>
	);
} 