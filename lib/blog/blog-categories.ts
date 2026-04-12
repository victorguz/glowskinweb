import type { BlogPost } from "./types";
import { getAllPosts } from "./posts";

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  posts: BlogPost[];
  count: number;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    name: "Tratamientos",
    slug: "tratamientos",
    description:
      "Tratamientos faciales profesionales y protocolos de estética avanzada en Barranquilla",
    posts: getAllPosts().filter((post) => post.category === "Tratamientos"),
    count: 0,
  },
  {
    name: "Skin Care",
    slug: "skin-care",
    description:
      "Cuidado de la piel, limpieza facial y mantenimiento para piel saludable",
    posts: getAllPosts().filter((post) => post.category === "Skin Care"),
    count: 0,
  },
  {
    name: "Ciencia",
    slug: "ciencia",
    description:
      "Artículos científicos sobre tecnología, ingredientes y tratamientos avanzados",
    posts: getAllPosts().filter((post) => post.category === "Ciencia"),
    count: 0,
  },
  {
    name: "Consejos",
    slug: "consejos",
    description:
      "Guías prácticas, recomendaciones y educación para cuidado facial",
    posts: getAllPosts().filter((post) => post.category === "Consejos"),
    count: 0,
  },
  {
    name: "Glow Skin",
    slug: "glow-skin",
    description:
      "Artículos sobre nuestro centro, metodología y enfoque único en Barranquilla",
    posts: getAllPosts().filter((post) => post.category === "Glow Skin"),
    count: 0,
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description:
      "Tendencias, análisis de celebridades y factores que influyen en la piel",
    posts: getAllPosts().filter((post) => post.category === "Lifestyle"),
    count: 0,
  },
];

// Update count for each category
BLOG_CATEGORIES.forEach((category) => {
  category.count = category.posts.length;
});

export const getAllPostsByCategory = (): BlogCategory[] => {
  return BLOG_CATEGORIES;
};

export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  const category = BLOG_CATEGORIES.find((cat) => cat.slug === categorySlug);
  return category ? category.posts : [];
};

export const getCategoryBySlug = (
  categorySlug: string,
): BlogCategory | undefined => {
  return BLOG_CATEGORIES.find((cat) => cat.slug === categorySlug);
};
