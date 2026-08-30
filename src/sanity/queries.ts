import { groq } from "next-sanity";

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  category,
  coverImage,
  question,
  shortAnswer,
  metaDescription
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${postFields} }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] { ${postFields}, body }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current, publishedAt }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heading,
    intro,
    portrait,
    body,
    metaDescription
  }
`;
