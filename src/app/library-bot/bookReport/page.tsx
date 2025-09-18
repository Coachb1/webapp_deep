import BookReport from "@/components/books/BookReport/BookReport";

interface BookPageProps {
  searchParams: { package_course_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
      <BookReport packageCourseId={searchParams.package_course_id} />
)
}
