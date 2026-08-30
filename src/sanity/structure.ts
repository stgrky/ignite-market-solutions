import type { StructureResolver } from "sanity/structure";

/**
 * Studio sidebar. The About page is pinned as a single editable document
 * rather than a list you can add to — there's only ever one About page.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("About Page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.divider(),
      S.documentTypeListItem("post").title("Blog Posts"),
    ]);
