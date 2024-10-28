import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { getWeekNumber } from '@/app/lifesync/calendar/api/getDates'
export default function Week() {
  return (
     <Card
     className="lg:max-w-md" x-chunk="charts-01-chunk-0"
   >
     <CardHeader className="space-y-0 pb-2">
     <CardDescription>Uge nr:</CardDescription>
       <CardTitle className="text-4xl tabular-nums">
        <h1>
            {getWeekNumber(new Date())}
        </h1>
       </CardTitle>
     </CardHeader>
     </Card>
  )
}
