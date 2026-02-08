import {
  orderRankField,
  orderRankOrdering,
} from "@sanity/orderable-document-list";
import { type SchemaTypeDefinition } from "sanity";
import { defineType, defineField } from "sanity";

const testType = defineType({
  name: "test",
  type: "document",
  title: "Test",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    orderRankField({
      type: "test",
      newItemPosition: "before",
    }),
  ],
});

const assets = defineType({
  type: "document",
  name: "assets",
  title: "Assets",
  fields: [
    defineField({
      name: "hand",
      title: "Hand",
      type: "image",
    }),
    defineField({
      name: "projects_video",
      title: "Projects Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "spots_video",
      title: "Spots Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "showreels_video",
      title: "Showreels Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
  ],
});

const projectType = defineType({
  type: "document",
  name: "project",
  title: "Projects",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "text",
      name: "description",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video URL",
    }),
    orderRankField({
      type: "project",
      newItemPosition: "before",
    }),
  ],
});

const showreelType = defineType({
  type: "document",
  name: "showreel",
  title: "Showreels",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "text",
      name: "description",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video URL",
    }),
    orderRankField({
      type: "showreel",
      newItemPosition: "before",
    }),
  ],
});

const spotType = defineType({
  type: "document",
  name: "spot",
  title: "Spots",
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "text",
      name: "description",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "videoUrl",
      type: "url",
      title: "Video URL",
    }),
    orderRankField({
      type: "spot",
      newItemPosition: "before",
    }),
  ],
});

const whatAreYouLookingFor = defineType({
  name: "whatAreYouLookingFor",
  type: "document",
  fields: [
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
  ],
});

const credits = defineType({
  name: "credits",
  type: "document",
  fields: [
    defineField({
      name: "description",
      type: "text",
      title: "Description",
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});

const whatsThis = defineType({
  name: "whatsThis",
  type: "document",
  fields: [
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    projectType,
    whatAreYouLookingFor,
    spotType,
    showreelType,
    credits,
    whatsThis,
    assets,
  ],
};
