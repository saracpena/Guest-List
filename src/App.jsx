import { useState, useEffect } from "react";
import axios from "axios";

const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/COHORT_CODE/guests";

export default function App() {
  const [guests, setGuests] = useState([]);
  const [selectedGuestId, setSelectedGuestId] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);

  /**Fetch ALL Guests */
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        /* const response = await fetch("http://localhost:3000/guests");
           const { data } = await response.json();*/
        const { data } = await axios.get(API);
        setGuests(data.data);
      } catch (error) {
        console.error("Error fetching guests:", error);
      }
    };

    fetchGuests();
  }, []);

  /**Fetch Selected Guest */
  //!IMPORTANT: This useEffect is dependent on the selectedGuestId state. When the selectedGuestId changes, this effect will run and fetch the details of the selected guest. If no guest is selected (selectedGuestId is null), it will reset the selectedGuest state to null.
  //! So, when a user clicks on a guest in the list, the selectedGuestId state is updated, triggering this effect to fetch and display the details of that specific guest. If the user clicks "Back", the selectedGuestId is set to null, and the effect resets the selectedGuest state, returning to the guest list view.
  useEffect(() => {
    if (!selectedGuestId) {
      setSelectedGuest(null);
      return;
    }
    const fetchSelectedGuest = async () => {
      try {
        const { data } = await axios.get(`${API}/${selectedGuestId}`);
        setSelectedGuest(data.data);
      } catch (error) {
        console.error("Error fetching selected guest:", error);
      }
    };

    fetchSelectedGuest();
  }, [selectedGuestId]);

  /** Display Selected Guest Details */
if (selectedGuest) {
  return (
    <main>
      <section className="guest-card">
      <h1>Guest Details</h1>
      </section>

      <h2>{selectedGuest.name}</h2>
      <p>Email: {selectedGuest.email}</p>
      <p>Phone: {selectedGuest.phone}</p>
      <p>Bio: {selectedGuest.bio}</p>
      <p>Job: {selectedGuest.job}</p>

      <button onClick={() => setSelectedGuestId(null)}>
      ← Back to Guest List
      </button>
    </main>
  );
}

/** Display Guest List */
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
