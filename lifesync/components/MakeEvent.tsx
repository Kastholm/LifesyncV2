import React from "react";

export default async function makeEvent(eventData: any) {
  try {
    const response = await fetch("/api/createEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Begivenhed oprettet:", result);
    } else {
      console.error("Fejl ved oprettelse:", result);
    }
  } catch (error) {
    console.error("Fejl:", error);
  }
}

// Brug funktionen i din komponent:
createEvent({
  eventName: "Møde",
  eventType: "aftale",
  eventDate: new Date().toISOString(), // Send som ISO format
});
