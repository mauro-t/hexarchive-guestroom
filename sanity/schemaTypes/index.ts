import { type SchemaTypeDefinition } from "sanity";
import { defineType, defineField } from "sanity";

const projectType = defineType({
  type: "document",
  name: "project",
  title: "Projects",
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
  ],
});

const showreelType = defineType({
  type: "document",
  name: "showreel",
  title: "Showreels",
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
  ],
});

const spotType = defineType({
  type: "document",
  name: "spot",
  title: "Spots",
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
  ],
});

const credits = defineType({
  name: "credits",
  type: "document",
  fields: [
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
  ],
});

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, spotType, showreelType, credits, whatsThis],
};
