"use client";

import {
  PresentationSlideEditor,
  SlideSkeleton,
} from "@/components/presentation/presentationSlides";

export default function SlidesPanel({
  slides,
  loading,
  saving,
  taskStatus,
  onUpdate,
  onSave,
}: any) {
  return (
    <div className="col-span-2">
      <h3 className="text-lg font-semibold mb-3">Slides</h3>

      {slides.length === 0 ? (
        <div className="p-6 bg-white border rounded text-gray-500">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-[500px]">
                <SlideSkeleton />
              </div>
              <div className="text-center text-sm text-gray-600">
                Preparing your presentation…
                <br />
                <span className="text-gray-400">
                  This may take a few moments.
                </span>
              </div>
            </div>
          ) : (
            <div>No slides yet. Generate a presentation to preview.</div>
          )}
        </div>
      ) : (
        <PresentationSlideEditor
          slides={slides}
          onUpdate={onUpdate}
          path={taskStatus?.data?.path}
        />
      )}
    </div>
  );
}
