import PageTransition from "@/components/page-transition";
import { BlogForm } from "@/components/admin/blog-form";

export default function NewBlogPage() {
  return (
    <PageTransition className="pt-32 pb-16 px-6 md:px-12 xl:px-24 w-full mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Write a New Blog</h1>
        <p className="text-muted-foreground">Create a new article for your portfolio.</p>
      </div>
      
      <BlogForm isEdit={false} />
    </PageTransition>
  );
}
