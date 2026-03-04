import { getAllPosts } from "@/lib/posts";
import BlogClient from "../components/BlogClient";

export const metadata = {
  title: "Fitness Blog — Training, Nutrition & Health",
  description: "Free science-backed articles about training, nutrition and health.",
};

export default function ENBlog() {
  const posts = getAllPosts("en");
  return <BlogClient posts={posts} lang="en" />;
}
