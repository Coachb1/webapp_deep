import BookReport from "@/components/books/BookReport/BookReport";

interface BookPageProps {
  searchParams: { course_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
      <BookReport courseId={searchParams.course_id} />
)
}
