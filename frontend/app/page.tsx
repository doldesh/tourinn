'use client'

import React from 'react'
import Home from "@/components/Home/Home"
import { TourCard } from '@/components/Card/TourCard'

// const Homepage = () => {
//   return (
//     <div>
//       <Home />
//       <TourCard />
//     </div>
//   )
// }

// 1. Define the full data object outside or inside the component
const sampleTour = {
  id: "accra-lawn-001",
  name: "Accra Lawn Tennis Club",
  hours: "7:00 AM - 7:30 PM",
  location: "Castle Road, Osu Klottey, Accra, Ghana",
  price: "GHS 50 / hour",
  images: [
    "https://images.unsplash.com/photo-1595435064212-3626376c34a3", // Tennis court img
    "https://images.unsplash.com/photo-1622279457486-62dcc4a497c8"
  ],
  activities: [
    {
      name: "Tennis",
      slots: [
        { time: "12:00 PM - 1:30 PM", available: true },
        { time: "1:30 PM - 3:00 PM", available: true },
        { time: "3:00 PM - 4:30 PM", available: false }
      ]
    },
    {
      name: "Pickleball",
      slots: [
        { time: "10:00 AM - 11:30 AM", available: true },
        { time: "12:00 PM - 1:30 PM", available: false }
      ]
    }
  ]
};

const Homepage = () => {
  const handleBooking = (tourId: string, activity: string, time: string) => {
    alert(`Booking ${activity} at ${time} for ${tourId}`);
  };

  const handleCardClick = (tourId: string) => {
    console.log("Navigating to:", tourId);
  };

  return (
    <div>
      <Home />
      {/* Now TypeScript is happy because all requirements are met! */}
      <TourCard
        tour={sampleTour}
        onBookSlot={handleBooking}
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default Homepage
