import { useEffect, useState } from "react";

export default function Admin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/bookings")
      .then(res => res.json())
      .then(data => setBookings(data));
  }, []);

  async function handleDelete(id) {
    const confirmDelete = confirm("Tem certeza que deseja cancelar este agendamento?");

    if (!confirmDelete) return;
    
    await fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE"
    });

    setBookings((prev) => prev.filter(b => b.id !== id));
  }

  return (
    <div className="container">
      <h2 className="title">Admin</h2>

      {bookings.length === 0 ?
        <p className="message">Nenhum agendamento ainda</p> :
        bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <div className="booking-info">
              <p className="booking-name">{b.name}</p>
              <p className="booking-date">
                {new Date(b.date).toLocaleDateString("pt-BR")} • {b.time}
              </p>
            </div>

            <button
              className="button small danger"
              onClick={() => handleDelete(b.id)}
            >
              Cancelar
            </button>
          </div>
        ))}
    </div>
  );
}