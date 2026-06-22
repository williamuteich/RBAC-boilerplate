"use client";

import { EditorProvider } from "./EditorContext";
import { BasicInfoSection } from "./BasicInfoSection";
import { PhotoGallerySection } from "./PhotoGallerySection";
import { ContentMediaSection } from "./ContentMediaSection";
import { PublishSection } from "./PublishSection";

export function DashboardEditor() {
  return (
    <EditorProvider>
      <div className="w-full flex flex-col gap-8 pb-12 font-sans selection:bg-[#9A75F0] selection:text-white">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-2 flex flex-col gap-6">
            <BasicInfoSection />
            <PhotoGallerySection />
            <ContentMediaSection />
          </div>

          <div className="xl:col-span-1 flex flex-col gap-6">
            <PublishSection />
          </div>

        </div>
      </div>
    </EditorProvider>
  );
}
