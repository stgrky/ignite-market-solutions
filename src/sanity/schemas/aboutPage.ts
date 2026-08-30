import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The About page — a singleton.
 *
 * Deliberately loose: `body` is free-form rich text so Steven can write
 * whatever the page needs without fighting a rigid field structure. The only
 * opinionated bit is the portrait, which matters here for the same reason it
 * matters on client sites — people decide who to trust by looking at a face.
 */
export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Page heading",
      type: "string",
      description: "The big line at the top of the page.",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
      description: "Optional. A sentence or two under the heading, set larger than body text.",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      description: "The main writing. Use headings to break it into sections.",
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
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 2,
      description: "For search results. ~155 characters.",
      validation: (rule) => rule.max(165),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
