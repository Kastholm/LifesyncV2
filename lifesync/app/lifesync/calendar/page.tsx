import React from "react";
import { getDates } from '@/app/api/getDates';
import './stylesheets/calendar.css'

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
    <p className="text-4xl font-bold text-gray-800 mb-8">{month} {year}</p>
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
                          Number(day) === index ? (
                          <p className={`text-sm px-2 py-1 rounded-lg w-full ${date.type}`}>{date.localName}</p>
                        ) : null
                        }
                        </h1>;
                    })
                  }
                </div>
            </div>
            ))
          }

         



            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">01</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">02</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">03</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">04</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">05</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">06</p>
            </div>
            <div className="flex items-start justify-start w-40 h-full pl-2 pr-32 pt-2.5 pb-24 border border-gray-200">
                <p className="opacity-50 text-sm font-medium text-gray-800">07</p>
            </div>
    </div>
</div>
</div>
    
  );
}
