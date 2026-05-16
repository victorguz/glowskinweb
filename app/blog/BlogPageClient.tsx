"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogListItem } from "@/lib/blog/posts";

const BASE_IMG_URL = "https://main.dlloltrpvu8dp.amplifyapp.com/assets/images";

const BLOG_HERO = `${BASE_IMG_URL}/hero/3-glow-skin-hero-servicios-esteticos.webp`;

type Props = { posts: BlogListItem[] };

export function BlogPageClient({ posts }: Props) {
  const filtered = posts;

  return (
    <div className="min-h-screen bg-[#f7f0eb] font-sans text-[#4a3221] overflow-x-hidden selection:bg-[#d4b499] selection:text-white">
      <header className="pt-52 pb-32 text-center relative">
        <div className="absolute inset-0 -z-10 opacity-[0.12] pointer-events-none">
          <img
            src={BLOG_HERO}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center">
            <div className="w-24 h-px bg-[#d4b499] mb-8" />
            <h1 className="text-6xl md:text-[9rem] font-serif leading-none tracking-tighter text-[#4a3221]">
              Blog
              <span className="block font-script text-5xl md:text-9xl text-[#d4b499] -mt-4 md:-mt-10 lowercase">
                Glow Skin
              </span>
            </h1>
            <div className="w-24 h-px bg-[#d4b499] mt-8 mb-12" />
            <p className="text-lg md:text-xl font-medium text-[#7d5a44] max-w-2xl leading-relaxed italic tracking-wide text-balance px-4">
              Ciencia, bienestar y cuidado facial en Barranquilla — artículos
              por Sofía Nieto y el equipo Glow Skin.
            </p>
          </div>
        </div>
      </header>

      <section className="pb-56 container mx-auto px-6 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
          {filtered.map((post) => (
            <article key={post.slug} className="group flex flex-col">
              <Link
                href={`/blog/${post.slug}`}
                className="block flex flex-col flex-grow"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-10 shadow-[0_30px_80px_rgba(74,50,33,0.12)]">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#4a3221] text-[#f7f0eb] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-end gap-4 mb-6">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                      <Calendar size={14} aria-hidden /> {post.date}
                    </div>
                    <div className="flex-grow border-b border-[#d4b499]/20 mb-1.5 border-dotted" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#a5846e]">
                      {post.readTime} lectura
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-serif text-[#4a3221] mb-6 leading-tight tracking-tight group-hover:text-[#d4b499] transition-colors uppercase">
                    {post.title}
                  </h2>

                  <p className="text-[#7d5a44] text-lg font-medium leading-relaxed mb-10 opacity-80 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-[#4a3221]/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#4a3221] group-hover:text-[#d4b499] transition-all group-hover:translate-x-2">
                    Leer artículo <ArrowRight size={16} aria-hidden />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="text-center text-[#7d5a44] mt-16">
            No hay artículos en esta categoría todavía.
          </p>
        ) : null}
      </section>

      <style>{`
        /* Google Fonts import eliminado para optimización. Usa next/font en layout.tsx */
        html { scroll-behavior: smooth; }
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        .font-script { font-family: 'Cormorant Garamond', serif; font-style: italic; }
      `}</style>
    </div>
  );
}
