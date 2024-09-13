
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { getBooks } from "@/app/api/getBooks";
import { urlFor } from "@/lib/client";

export default async function Books() {
 

  const books = await getBooks();

  return (
    <aside className="grid flex-1 items-start gap-4 md:gap-8">
          <Tabs defaultValue="read">
            <div className="items-center hidden gap-2">
              <TabsList>
                <TabsTrigger value="read">Read</TabsTrigger>
              </TabsList>
              
            </div>

            <TabsContent value="read">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Need to read books
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Watch 
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                         {
                              books.map((book) => (
                                   <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"

    src={urlFor(book.image)
      .format("webp")
      .width(700)
      .height(400)
      .fit("fill")
      .quality(85)
      .url()}
                              alt={book.title}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium w-[80vw] max-w-[50ch] ">
                        {book.title}
                        </TableCell>
                        <TableCell><Badge variant="outline">Watch Now</Badge>
                        </TableCell>
                      </TableRow>
                              ))
                         }
                      
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            
          </Tabs>
          
     </aside>
  );
}