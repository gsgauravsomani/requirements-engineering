window.WELKOLN_DATA = {
  user: {
    traveller: "Alex Gonzales",
    business: "Maria Muller",
    location: "Cologne Cathedral",
  },
  weather: {
    temp: "18 C",
    rain: "42%",
    wind: "NW 14 km/h",
    humidity: "66%",
    updated: "Updated 4 min ago",
  },
  transport: {
    line: "KVB 5",
    message: "Minor delay toward Friesenplatz",
    nextRoute: "Next best route via Dom/Hbf in 8 min",
    updated: "Updated 45 sec ago",
    departures: [
      { line: "KVB 5", destination: "Friesenplatz", time: "3 min", status: "Delayed 4 min" },
      { line: "S12", destination: "Koeln Hbf", time: "6 min", status: "On time" },
      { line: "KVB 1", destination: "Ehrenfeld", time: "9 min", status: "Platform change: 3B" },
    ],
    stops: ["Cologne Cathedral", "Koeln Hbf", "Friesenplatz", "Ehrenfeld", "Rheinauhafen"],
    routesByDestination: {
      "Koeln Hbf": {
        nextRoute: "Next best route via Dom/Hbf in 8 min",
        departures: [{ line: "S12", destination: "Koeln Hbf", time: "6 min", status: "On time" }],
      },
      Friesenplatz: {
        nextRoute: "Direct KVB 5 route, 4 stops",
        departures: [{ line: "KVB 5", destination: "Friesenplatz", time: "3 min", status: "Delayed 4 min" }],
      },
      Ehrenfeld: {
        nextRoute: "Next best route via Hbf, transfer to KVB 1",
        departures: [{ line: "KVB 1", destination: "Ehrenfeld", time: "9 min", status: "Platform change: 3B" }],
      },
      Rheinauhafen: null,
    },
  },
  places: [
    {
      id: "museum",
      name: "Museum Ludwig",
      type: "Museum",
      distance: "320 m",
      rating: "4.7",
      availability: "Tickets today",
      slotStatus: "available",
      price: "EUR 11",
      weather: "Good indoor option if rain starts.",
    },
    {
      id: "cafe",
      name: "Maria's Altstadt Cafe",
      type: "Cafe",
      distance: "450 m",
      rating: "4.8",
      availability: "Waitlist open",
      slotStatus: "full",
      price: "EUR 8-18",
      weather: "Covered terrace available.",
    },
  ],
  plans: [
    {
      id: "cafe-meetup",
      title: "Cafe meetup near the Dom",
      time: "Today, 17:30",
      place: "Maria's Altstadt Cafe",
      location: "Maria's Altstadt Cafe, Altstadt",
      description: "Casual meetup for travellers near the Dom. Coffee and conversation, low pressure to stay long.",
      creator: "Sofia K.",
      people: "4 joined",
      status: "Open to join",
    },
    {
      id: "museum-walk",
      title: "Museum Ludwig afternoon visit",
      time: "Tomorrow, 14:00",
      place: "Museum Ludwig",
      location: "Museum Ludwig",
      description: "Small group visit to Museum Ludwig, followed by a short walk along the Rhine.",
      creator: "Jonas B.",
      people: "2 joined",
      status: "Request needed",
    },
  ],
  business: {
    name: "Maria's Altstadt Cafe",
    address: "Altstadt, Cologne",
    openingHours: "09:00-22:00",
    description: "A cozy cafe near the Cathedral serving coffee, cake, and light meals.",
    type: "Restaurant",
    offers: "10% off pastries before 11:00",
  },
  admin: {
    users: [
      {
        id: 1, name: "Alex Gonzales", role: "Traveller", flagged: false, consented: true,
        email: "alex.gonzales@mail.com", location: "Cologne, Germany", joined: "2026-03-02", lastActive: "Today",
      },
      {
        id: 2, name: "Maria Muller", role: "Business", flagged: false, consented: true,
        email: "maria.muller@altstadtcafe.de", location: "Altstadt, Cologne", joined: "2025-11-14", lastActive: "Today",
      },
      {
        id: 3, name: "Sofia K.", role: "Traveller", flagged: false, consented: true,
        email: "sofia.k@mail.com", location: "Cologne, Germany", joined: "2026-01-20", lastActive: "Yesterday",
      },
      {
        id: 4, name: "Unverified account 482", role: "Traveller", flagged: true, consented: false,
        email: "user482@mail.com", location: "Unknown", joined: "2026-07-10", lastActive: "2 hours ago",
        flagReason: "Multiple booking requests cancelled within minutes across different businesses.",
      },
      {
        id: 5, name: "Jonas B.", role: "Traveller", flagged: false, consented: false,
        email: "jonas.b@mail.com", location: "Cologne, Germany", joined: "2026-05-18", lastActive: "3 days ago",
      },
    ],
    moderationQueue: [
      {
        id: "m1",
        type: "Review",
        involved: "Maria's Altstadt Cafe",
        content: "This place is a scam, avoid these thieves!!!",
        reason: "Flagged: aggressive / inappropriate language",
      },
      {
        id: "m2",
        type: "PlanShare post",
        involved: "Sofia K.",
        content: "Free giveaway, click this link to claim your prize now!!",
        reason: "Flagged: spam content",
      },
    ],
    systemHealth: {
      uptime: "99.4% (last 30 days)",
      activeUsers: 128,
      flaggedContent: 2,
    },
  },
  support: {
    faqs: [
      { q: "How do I cancel a booking?", a: "Open Bookings, select the booking, and tap Cancel." },
      { q: "Why was my review flagged?", a: "Reviews are checked for inappropriate or prohibited content before publishing." },
      { q: "How do I change my privacy settings?", a: "Go to Profile -> Privacy controls to update consent at any time." },
    ],
  },
  reviews: [
    {
      text: "Friendly service and easy to find from the Dom.",
      rating: 5,
      reply: "Thank you, Alex. We are happy you visited us.",
    },
  ],
};
