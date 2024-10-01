import React from "react";
import { CalendarForm } from "./components/CalendarForm";
import { Button } from "@/components/ui/button";

export default function page() {
  async function sendDate(data) {
    console.log("hi", data);
  }

  return (
    <div>
      <CalendarForm onSubmit={sendDate} />
    </div>
  );
}
