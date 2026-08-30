import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A blog post on ignitecreativeco.world.
 *
 * Shaped for two audiences at once:
 *   1. Google — needs a real title, description, and clean structure.
 *   2. AI assistants — cite sources that answer a question directly and are
 *      easy to extract. That's what `question` / `shortAnswer` are for: they
 *      render as a summary block at the top of the post AND feed FAQ schema,
 *      which is the most citable format there is.
 */
export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO & AI" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description:
        "Write it the way someone would search for it. 'What does a therapist website cost?' beats 'Our Pricing Philosophy'.",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "One or two sentences. Shown on the blog index and used as the meta description if you don't set one below.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Websites & Design", value: "websites" },
          { title: "Getting Found Online", value: "visibility" },
          { title: "Running a Practice", value: "practice" },
          { title: "Behind the Scenes", value: "behind-the-scenes" },
        ],
        layout: "radio",
      },
      initialValue: "websites",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and search engines.",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "url", title: "URL" },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    // ── SEO & AI ──────────────────────────────────────────────
    defineField({
      name: "question",
      title: "The question this post answers",
      type: "string",
      group: "seo",
      description:
        "Phrase it exactly as someone would ask it out loud. This renders as a summary box at the top of the post and becomes FAQ structured data — which is what AI assistants quote.",
    }),
    defineField({
      name: "shortAnswer",
      title: "Short answer",
      type: "text",
      rows: 3,
      group: "seo",
      description:
        "Answer the question above in 2–3 sentences, so it stands on its own if someone only reads this part. Be specific — vague answers don't get cited.",
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description (optional)",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Leave blank to use the excerpt. ~155 characters is ideal.",
      validation: (rule) => rule.max(165),
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
