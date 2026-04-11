import type { BlogBlock } from '@/lib/blog/types';

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'lead':
      return (
        <p className="text-xl md:text-2xl font-medium italic leading-relaxed text-[#7d5a44] text-balance border-l-4 border-[#d4b499] pl-6 py-2">
          {block.text}
        </p>
      );
    case 'p':
      return <p className="text-lg md:text-xl leading-[1.85] font-medium text-[#4a3221]/90">{block.text}</p>;
    case 'h2':
      return (
        <h2 className="font-serif text-3xl md:text-4xl text-[#4a3221] pt-6 tracking-tight scroll-mt-28">
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3 className="font-serif text-2xl md:text-3xl text-[#4a3221] pt-4 tracking-tight">{block.text}</h3>
      );
    case 'quote':
      return (
        <blockquote className="relative py-10 my-4 border-y border-[#d4b499]/30">
          <p className="text-2xl md:text-3xl font-serif italic text-[#4a3221] leading-snug text-balance">
            {block.text}
          </p>
          {block.attribution ? (
            <footer className="mt-4 text-[10px] font-black uppercase tracking-[0.35em] text-[#a5846e]">
              — {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    case 'list':
      return (
        <ul className="list-disc pl-6 space-y-3 text-lg md:text-xl text-[#4a3221]/90 font-medium marker:text-[#d4b499]">
          {block.items.map((item) => (
            <li key={item} className="leading-relaxed pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export function BlogArticleBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-8 md:space-y-10">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  );
}
