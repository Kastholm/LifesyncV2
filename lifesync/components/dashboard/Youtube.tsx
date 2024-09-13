
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
import { getBooks } from "@/app/api/getBooks";
import { getDates } from "@/app/api/getDates";

export default async function YouTube() {
 
  const data = await getVideos();
  const videos = data.items;


  const dates = await getDates();
  //console.log(dates)

  return (
    <aside className="grid flex-1 items-start gap-4 md:gap-8">
          <Tabs defaultValue="watch">
            <div className="items-center hidden gap-2">
              <TabsList>
                <TabsTrigger value="watch">Watch</TabsTrigger>
              </TabsList>
              
            </div>

           
            <TabsContent value="watch">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>YouTube</CardTitle>
                  <CardDescription>
                    Wathc later videos.
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