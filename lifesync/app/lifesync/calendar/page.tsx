'use server'
import React from "react";
import { getDates } from '@/app/lifesync/calendar/api/getDates';
import './stylesheets/calendar.css'
import { CalendarForm } from "./components/CalendarForm";

export default async function page() {

  const today = new Date();
  const year = today.getFullYear()
  const month = today.toLocaleString('default', { month: 'long' });
  const getDays = (year, month) => {
    return new Date(year, month, 0).getDate();
};
const daysThisMonth = getDays(year, today.getMonth())

const monthArray = Array.from({length: daysThisMonth}, (_, i) => i + 1)


const dayNumber = today.getDate();

const dates = await getDates();




  return (
    
      <div className="bg-white md:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
         <CalendarForm />
    <aside className="flex gap-4"><p className="text-4xl font-bold text-gray-800 mb-8">{month} {year}</p></aside>
    <div className="inline-flex flex-col space-y-1 items-start justify-start h-full w-full">
    <div className="inline-flex space-x-28 items-start justify-start pr-24 h-full w-full">
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">M</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">T</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">W</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">T</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">F</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">S</p>
        <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">S</p>
    </div>
    <div className="grid grid-cols-7 items-start justify-start">
        


          {
            monthArray.map((index) => (
              <div className="flex relative items-start justify-start w-40 h-full min-h-36  border border-gray-200">
                {
                  index === dayNumber ? (
                <p className=" absolute text-sm bg-green-300 rounded-xl py-1 px-2.5 m-1 font-medium text-gray-800">
                  Today
                  </p>
                  ) : (
                    <p className=" absolute text-sm p-2 m-1  font-medium text-gray-800">
                  {index}
                  </p>
                  )
                }
                
                
                <div className="translate-y-10 pl-2">
                  {
                    dates.map((date) => {
                      const day = date.date.split('-')[2]; // Split datoen og hent dagen (det tredje element)
                      return <h1>
                        {
                          Number(day) === index && <p className={`text-sm px-2 py-1 rounded-lg w-full ${date.type}`}>{date.localName}</p> 
                        }
                        </h1>;
                    })
                  }
                </div>
            </div>
            ))
          }
         
         
    </div>
</div>
</div>
    
  );
}
