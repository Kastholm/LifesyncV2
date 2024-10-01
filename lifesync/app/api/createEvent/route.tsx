// /pages/api/createEvent.ts
export async function post(req, res) {
  const { eventName, eventType, eventDate } = req.body;

  console.log("hej");

  try {
    // Logik til at behandle event data, f.eks. oprette i en database
    console.log({ eventName, eventType, eventDate }); // Til testning

    res.status(200).json({ message: "Event oprettet!", data: req.body });
  } catch (error) {
    res.status(500).json({
      message: "Fejl under oprettelse af event",
      error: error.toString(),
    });
  }
}
