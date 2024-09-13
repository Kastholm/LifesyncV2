import React from 'react'
import { getBooks } from '@/app/api/getBooks'

export default async function Library() {

     const books = await getBooks();
     console.log(books, 'dsds')

  return (
    <div>Library</div>
  )
}
