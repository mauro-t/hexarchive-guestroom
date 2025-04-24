"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["credits", "whatsThis"]);

export default defineConfig({
  basePath: "/admin",
  projectId,
  dataset,
  schema: {
    types: schema.types,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("spot").title("Spots"),
            S.documentTypeListItem("showreel").title("Showreel"),
            S.listItem()
              .title("Credits")
              .id("credits")
              .child(S.document().schemaType("credits").documentId("credits")),
            S.listItem()
              .title("What's this")
              .id("whatsThis")
              .child(
                S.document().schemaType("whatsThis").documentId("whatsThis"),
              ),
          ]),
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
