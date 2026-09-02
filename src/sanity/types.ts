import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  coverImage?: Image & { alt?: string };
  question?: string;
  shortAnswer?: string;
  metaDescription?: string;
  body?: PortableTextBlock[];
};

export type AboutPage = {
  heading?: string;
  intro?: string;
  portrait?: Image & { alt?: string };
  portraitDimensions?: { width: number; height: number } | null;
  body?: PortableTextBlock[];
  metaDescription?: string;
};

export const CATEGORY_LABELS: Record<string, string> = {
  websites: "Websites & Design",
  visibility: "Getting Found Online",
  practice: "Running a Practice",
  "behind-the-scenes": "Behind the Scenes",
};
