export type BlogBlock =
  | { type: "lead"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Subtítulo corto bajo el H1 */
  deck?: string;
  description: string;
  keywords: string[];
  datePublished: string;
  category: string;
  readTimeLabel: string;
  image: string;
  blocks: BlogBlock[];
};
