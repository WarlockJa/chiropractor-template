import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const maxNumberOfPages = 8;

export default function BlogsListPagination({
  page,
  blogsNumber,
  limit,
}: {
  page: number;
  blogsNumber: number;
  limit: number;
}) {
  const pagesArray = new Array(
    Math.ceil(blogsNumber / limit) > maxNumberOfPages
      ? maxNumberOfPages
      : Math.ceil(blogsNumber / limit),
  );
  pagesArray[0] = page > maxNumberOfPages / 2 ? page - maxNumberOfPages / 2 : 0;
  for (let index = 1; index < pagesArray.length; index++) {
    pagesArray[index] = pagesArray[index - 1] + 1;
  }

  return (
    <Pagination className="fixed bottom-0 h-20 bg-gradient-to-t from-secondary to-transparent">
      <PaginationContent>
        {page > 0 && (
          <PaginationItem>
            <PaginationPrevious href={`/blog?page=${page - 1}`} />
          </PaginationItem>
        )}

        {page > maxNumberOfPages / 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesArray.map((pageNumber) => (
          <PaginationItem key={`pageNumber${pageNumber}`}>
            {pageNumber === page ? (
              <Button disabled aria-current={"page"} className="w-9">
                {page}
              </Button>
            ) : (
              <PaginationLink href={`/blog?page=${pageNumber}`}>
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {Math.ceil(blogsNumber / limit) - 1 - page > maxNumberOfPages / 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < Math.ceil(blogsNumber / limit) - 1 && (
          <PaginationItem>
            <PaginationNext href={`/blog?page=${page + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
