import React from 'react'
import { client } from '@/lib/client'

export async function getBooks() {

     const query = `*[_type == "library"] {
          _id,
          title,
          "image": image.asset,
          hasRead,
          "articleSlug": slug.current,

        }`;
      
        const data = await client.fetch(query);
        return data;

}
