import { Layout } from "@/components/Layout";
import { Gallery } from "@/components/Gallery";

export function PhotosPage() {
  return (
    <Layout>
      <div className="pt-10">
        <Gallery />
      </div>
    </Layout>
  );
}
