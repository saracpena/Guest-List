import { useState, useEffect } from "react";

const [guests, setGuests] = useState([]);
const [selectedGuestId, setSelectedGuestId] = useState([]);
const [selectedGuest, setSelectedGuest] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/guests");
      const { data } = await response.json();
      setGuests(data);
    } catch (error) {
      console.error("Error fetching guests:", error);
    }
  };

  fetchData();
}, []);

export default function App() {
  return <></>;
}
