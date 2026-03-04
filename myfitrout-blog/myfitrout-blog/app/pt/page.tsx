import { getAllPosts } from "@/lib/posts";
import BlogClient from "../components/BlogClient";

export const metadata = {
  title: "Blog Fitness — Treino, Nutrição & Motivação",
  description: "Artigos gratuitos e baseados em ciência sobre treino, nutrição e saúde.",
};

export default function PTBlog() {
  const posts = getAllPosts("pt");
  return <BlogClient posts={posts} lang="pt" />;
}
