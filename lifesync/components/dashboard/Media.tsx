
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";
import Link from "next/link";
import { getVideos } from "@/app/api/getVideos";
import { getBooks } from "@/app/lifesync/library/api/getBooks";
import { getDates } from "@/app/lifesync/calendar/api/getDates";
import { getMovies } from "@/app/api/auth/route";
import { cookies } from "next/headers";
import { urlFor } from "@/lib/client";

export default async function Media() {
 


  const data = await getVideos();
  const videos = data.items;

  
    const movies = await getMovies();

    const books = await getBooks();


  //console.log(dates)

  return (
    <aside className="grid flex-1 items-start mt-2 gap-4 md:gap-8">
          <Tabs defaultValue="trakt">
            <div className="items-center flex gap-2">
              <TabsList>
                <TabsTrigger value="trakt">Trakt</TabsTrigger>
              </TabsList>
              <TabsList>
                <TabsTrigger value="books">Bøger</TabsTrigger>
              </TabsList>
              <TabsList>
                <TabsTrigger value="youtube">Youtube</TabsTrigger>
              </TabsList>
              
            </div>

           
            <TabsContent value="trakt">
              <Card className="md:min-h-[470px]" x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Trakt</CardTitle>
                  <CardDescription>
                    Watch list. <Badge> <Link target="_blank" href='https://trakt.tv/users/kastholm95/watchlist?sort=rank,asc'>Edit</Link> </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[370px] overflow-y-scroll" >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Trailer
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                         {
                          movies ? (
                            movies.map((movie) => (
                              <TableRow>
                   <TableCell className="hidden sm:table-cell">
                     <Image
                       alt="Product image"
                       className="aspect-square rounded-md object-cover"
                       height="64"
                       src={`https://image.tmdb.org/t/p/w500${movie.tmdbData.poster_path}`}
                            alt={`Plakat for ${movie.movie.title}`}
                       width="64"
                     />
                   </TableCell>
                   <TableCell className="font-medium w-[80vw] max-w-[50ch] ">
                   {movie.movie.title}
                   </TableCell>
                   <TableCell>
                     <Link target="_blank" href={`https://www.youtube.com/results?search_query=${movie.movie.title} trailer`}><Badge variant="outline">Play now</Badge></Link>
                   </TableCell>
                 </TableRow>
                         ))
                          )
                           : (<Badge className="mt-4" variant='destructive'><Link href='/lifesync/trakt'>Get Token</Link></Badge>)
                              
                         }
                      
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books">
              <Card className="md:min-h-[570px]"  x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                  <CardDescription>
                    Need to read books
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[370px] overflow-y-scroll" >
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

            <TabsContent value="youtube">
              <Card className="md:min-h-[570px]"  x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>YouTube</CardTitle>
                  <CardDescription>
                    Wathc later videos. <Badge> <Link target="_blank" href='https://www.youtube.com/playlist?list=PLAKDE8PiTIRlGHK3mombeOi8YFf19SwZz'>Edit</Link> </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[370px] overflow-y-scroll" >
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
                              videos.map((video) => (
                                   <TableRow>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={video.snippet.thumbnails.medium.url}
                              alt={video.snippet.title}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium w-[80vw] max-w-[50ch] ">
                        {video.snippet.title}
                        </TableCell>
                        <TableCell>
                          <Link href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}><Badge variant="outline">Watch Now</Badge></Link>
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