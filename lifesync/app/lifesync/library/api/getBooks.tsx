import React from 'react'
import { client } from '@/lib/client'
import { BookModel } from '../models/bookModel';

export async function getBooks() {

     const query = `*[_type == "library"] {
          _id,
          title,
          "image": image.asset,
          hasRead,
          yearRead,
          "slug": slug.current,
        }`;
      
        const data = await client.fetch<BookModel[]>(query);
        return data;

}


export async function getBook(slug: string) {
     
     const query = `*[_type == "library" && slug.current == "${slug}"] {
          _id,
          title,
          "image": image.asset,
          hasRead,
          yearRead,
          "slug": slug.current,
        }`;
      
        const data = await client.fetch<BookModel>(query);
        return data;

}
