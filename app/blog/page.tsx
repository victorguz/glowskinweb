import { BlogPageClient } from '@/app/blog/BlogPageClient';
import { getBlogPostsForListing } from '@/lib/blog/posts';

export default function BlogIndexPage() {
  return <BlogPageClient posts={getBlogPostsForListing()} />;
}
