import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { getDates } from '@/app/lifesync/calendar/api/getDates';

export default async function Dates() {

     const dates = await getDates();
     const today = new Date();
     const compDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay() + 1}`
  return (
     <Tabs>
     <Card x-chunk="dashboard-05-chunk-3">
       <CardHeader className="px-7">
         <CardTitle>Datoer</CardTitle>
         <CardDescription>
           Vigtige datoer
         </CardDescription>
       </CardHeader>
       {
        dates.length > 0 ? (
          <CardContent>
         <Table>
           <TableHeader>
             <TableRow>
               <TableHead>Navn</TableHead>
               <TableHead className="hidden sm:table-cell">
                 Type
               </TableHead>
               <TableHead className="hidden sm:table-cell">
                 Status
               </TableHead>
               <TableHead className="hidden md:table-cell">
                 Date
               </TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
               {
                    dates.map((date) => (
                         <TableRow >
               <TableCell>
                 <div className="font-medium">{date.localName}
                 {date.year ? (<p className='text-lg font-bold'>{new Date().getFullYear() - date.year} år </p>) : null}
                </div>
                 
               </TableCell>
               <TableCell className="hidden sm:table-cell">
                 {
                 date.type ? ( <Badge className="text-xs capitalize" variant="default">
                 {date.type}
               </Badge>) : (<Badge className="text-xs" variant="outline">
               {date.types[0]}
               </Badge>)
                 }
               </TableCell>
               <TableCell className="hidden sm:table-cell">
                  {
                    new Date(date.date) > new Date() ? 
                    (
                      <Badge className="text-xs" variant="destructive">
                      {Math.floor((new Date(date.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} dage
                    </Badge>
                    ) : (
                      <Badge className="text-xs" variant="secondary">
                        Passeret
                  </Badge>
                    )
                  }
                 
               </TableCell>
               <TableCell className="hidden md:table-cell">
               {date.date}
               </TableCell>
             </TableRow>
                    ))
               }
           </TableBody>
         </Table>
       </CardContent>
        ) : (<p className='m-auto text-center'>Ingen datoer</p>)
       }
       
     </Card>
  
 </Tabs>
  )
}
