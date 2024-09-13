import {defineType, defineField, defineArrayMember} from 'sanity'

export const library = defineType({
  name: 'library',
  title: 'Library',
  type: 'document',
  fields: [
    defineField({
      name: 'hasRead',
      title: 'Bogen er læst',
      type: 'boolean',
      default: false,
    }),
    defineField({
      name: 'title',
      description: 'Bogens titel',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      options: {layout: 'tags'},
      of: [
        defineArrayMember({
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
})
