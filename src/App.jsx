import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/guests";


export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  
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
<table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {guests.map((guest) => (
          <tr
            key={guest.id}
            onClick={() => setSelectedGuestId(guest.id)}
            style={{ cursor: "pointer" }}
          >
            <td>{guest.name}</td>
            <td>{guest.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>  
  </main>
  );
}
