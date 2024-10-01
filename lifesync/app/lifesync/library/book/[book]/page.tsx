import React from 'react'
import { getBook } from '../../api/getBooks'
import { BookModel } from '../../models/bookModel';
import Image from 'next/image';
import { urlFor } from '@/lib/client';

export default async function Book({params} : {params: {book: string}}) {
  console.log(params.book)

  const book: BookModel = await getBook(params.book);

  const mainBook :  BookModel = book[0];

  return (
    <div>
        <h2>
          {mainBook?.title}
          <Image
                    className=" object-contain"
                    alt={mainBook.title}
                    src={urlFor(mainBook.image)
                      .format("webp")
                      .fit("fill")
                      .quality(85)
                      .url()}
                    height={600}
                    width={300}
                  />
        </h2>
    </div>
  )
}
