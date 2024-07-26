import {
  Pagination as ShadcnPaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const TestsPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxPaginationLinks = 5;

  return (
    <ShadcnPaginationComponent className="my-4">
      <Button
        variant={"link"}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="max-sm:text-xs"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> Previous
      </Button>
      <PaginationContent className="text-sm max-sm:text-xs">
        {Array.from({ length: totalPages }).map((_, index) => {
          if (
            (index < maxPaginationLinks &&
              currentPage <= maxPaginationLinks - 3) ||
            (index >= currentPage - 2 && index <= currentPage + 2) ||
            (index > totalPages - maxPaginationLinks &&
              currentPage >= totalPages - maxPaginationLinks + 2)
          ) {
            return (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => onPageChange(index + 1)}
                  className="max-sm:w-fit max-sm:px-2 max-sm:text-xs hover:cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            );
          } else if (
            (index === 1 && currentPage > 4 && totalPages > 5) ||
            (index === totalPages - 2 &&
              currentPage < totalPages - 3 &&
              totalPages > 5)
          ) {
            return (
              <span key={index} className="px-2">
                ...
              </span>
            );
          }
          return null;
        })}
      </PaginationContent>
      <Button
        variant={"link"}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="max-sm:text-xs"
      >
        Next <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
    </ShadcnPaginationComponent>
  );
};

export default TestsPagination;
