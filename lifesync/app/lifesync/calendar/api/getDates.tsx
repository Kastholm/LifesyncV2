import React from "react";


import { client } from "@/lib/client";
import jsonDates from "@/app/lifesync/calendar/lib/dates.json";

export async function getSanityDates() {
  const query = `*[_type == "calendar"] {
          _id,
          localName,
          type,
          date
        }`;

  const data = await client.fetch(query);
  return data;
}

export async function getDates() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const sanityDates = await getSanityDates();

  const res = await fetch(
    `https://date.nager.at/api/v3/publicholidays/${year}/DK
        `
  );
  const data = await res.json();


  const combinedData = data.concat(jsonDates, sanityDates);

  const getThisMonthDates = combinedData.reduce((current, date) => {
    if (new Date(date.date).getMonth() + 1 == month + 1) {
      current.push(date);
    }
    return current;
  }, []);

  getThisMonthDates.sort(
    (firstItem, secondItem) =>
      new Date(firstItem.date).getDate() - new Date(secondItem.date).getDate()
  );
  console.log(combinedData);
  return getThisMonthDates;
}

export function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number

  return weekNo;
}
