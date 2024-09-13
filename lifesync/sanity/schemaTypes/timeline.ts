import { defineType, defineField, defineArrayMember } from 'sanity'

export const timeline = defineType({
  name: "timeline",
  title: "Timeline",
  type: "object",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      description:
        "Allows for creating a number of timelines (max 2) for displaying in the page's body",
      type: "array",
      of: [
        defineArrayMember({
          name: "item",
          title: "Item",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "milestones",
              title: "Milestones",
              type: "array",
              of: [
                {
                  name: "milestone",
                  title: "Milestone",
                  type: "milestone",
                },
              ],
            },
          ],
        }),
      ],
    }),
  ],
});

