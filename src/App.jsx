import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/guests";


export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState([]);
  
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        /* const response = await fetch("http://localhost:3000/guests");
           const { data } = await response.json();*/
        const {data} = await axios.get(API);
        setGuests(data.data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };
  
    fetchGuests();
  }, []);
  return (
  <main>
  <div className="App">
      <h1>Guest List</h1>
      <ul>
        {guests.map((guest) => (
          <li key={guest.id}>
            {guest.name} - {guest.email}
          </li>
        ))}
      </ul>
    </div>  
  </main>
  );
}
