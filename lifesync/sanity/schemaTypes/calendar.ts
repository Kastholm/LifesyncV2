import {type} from 'os'
import {defineType, defineField, defineArrayMember} from 'sanity'

export const calendar = defineType({
  name: 'calendar',
  title: 'Kalender',
  type: 'document',
  fields: [
    defineField({
      name: 'eventName',
      description: 'Begivenheds navn',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'eventType',
      title: 'Begivenheds type',
      type: 'string', // Ændret til 'string' for at lave en dropdown
      options: {
        list: [
          {title: 'Aftale', value: 'aftale'},
          {title: 'Fødselsdag', value: 'birthday'},
          {title: 'Ferie', value: 'ferie'},
        ],
      },
    }),
    defineField({
      name: 'eventDate',
      title: 'Begivenheds dato',
      type: 'date', // Eller 'date' hvis du kun vil have dato uden tid
      options: {
        dateFormat: 'YYYY-MM-DD', // Du kan tilpasse formatet her
        calendarTodayLabel: 'Today', // Tekst til "i dag"-knappen
      },
    }),
  ],
})
