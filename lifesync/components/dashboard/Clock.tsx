'use client'
import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Clock from 'react-live-clock';

export default function MyClock() {
     const date = new Date();
  return (
     <aside className=''>
     <Card
     className="lg:max-w-md" x-chunk="charts-01-chunk-0"
   >
     <CardHeader className="space-y-0 pb-2">
     <CardDescription><Clock
          date={date.toISOString()}
          format={'dddd, MMMM Mo'} /></CardDescription>
       <CardTitle className="text-4xl tabular-nums">
       <h1>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>
       </CardTitle>
     </CardHeader>
     </Card>
     </aside>
  )
}
