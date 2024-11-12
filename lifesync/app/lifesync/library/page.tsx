import React from "react";
import { getBooks } from "./api/getBooks";
import "./stylesheets/bookshelf.css";
import { BookModel } from "./models/bookModel";
import { urlFor } from "@/lib/client";
import Image from "next/image";
import Link from "next/link";

export default async function Library() {
  const books: BookModel[] = await getBooks();

  const groupBooks = books.reduce((groupedBooks: any, book) => {
    const year = book.yearRead;
    if (groupedBooks[year] == null) {
      groupedBooks[year] = [];
    }
    groupedBooks[year].push(book);
    return groupedBooks;
  }, {});

  return (
    <section>
      <aside>
              <span className="two mt-8 ml-1">
                <h1>
                  <span>Læselisten</span>
                </h1>
              </span>
            <ul>
              {books.map((book: BookModel) => (
                book && book.hasRead === false && (
                <Link href={`/lifesync/library/book/${book.slug}`}>
                  <li key={book._id} className="book">
                    <Image
                      className=" object-contain"
                      alt={book.title}
                      src={urlFor(book.image)
                        .format("webp")
                        .fit("fill")
                        .quality(85)
                        .url()}
                      height={600}
                      width={300}
                    />
                  </li>
                </Link>
                )
              ))}
            </ul>
          </aside>
      {Object.entries(groupBooks).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, books]) => (
        
          <aside>
              <span className="two mt-8 ml-1">
                <h1>
                  <span>{year}</span>
                </h1>
              </span>
            <ul>
              {books.map((book: BookModel) => (
                book.hasRead && (
                <Link href={`/lifesync/library/book/${book.slug}`}>
                  <li key={book._id} className="book">
                    <Image
                      className=" object-contain"
                      alt={book.title}
                      src={urlFor(book.image)
                        .format("webp")
                        .fit("fill")
                        .quality(85)
                        .url()}
                      height={600}
                      width={300}
                    />
                  </li>
                </Link>
                )
              ))}
            </ul>
          </aside>
      ))}
    </section>
  );
}
