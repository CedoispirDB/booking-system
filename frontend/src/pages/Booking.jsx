import "../App.css"
import { useState, useEffect } from "react";
import { User, Mail, Calendar, Clock } from "lucide-react";

export default function Booking() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!date) return;

        fetch(`http://localhost:3000/availability?date=${date}`)
            .then(res => res.json())
            .then(setAvailableTimes);
    }, [date]);

    async function handleSubmit() {
        const newErrors = {};

        if (!name) newErrors.name = "Nome é obrigatório";
        if (!email) newErrors.email = "Email é obrigatório";
        if (!date) newErrors.date = "Data é obrigatória";
        if (!time) newErrors.time = "Selecione um horário";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        if (!name || !email || !date || !time) {
            setMessage("Preencha todos os campos");
            setError(true);
            return;
        }

        setLoading(true);
        setMessage("");
        setError(false);

        const res = await fetch("http://localhost:3000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, date, time }),
        });

        const data = await res.json();

        if (res.ok) {
            setMessage("Agendamento realizado com sucesso!");
        } else {
            setMessage(data.error);
            setError(true);
        }

        setLoading(false);
    }

    function clearError(field) {
        setErrors((prev) => ({
            ...prev,
            [field]: null
        }));
    }

    return (
        <div className="container">
            <h2 className="title">Agendar Consulta</h2>

            <div className="field">
                <div className="input-wrapper">
                    <span className="icon"><User size={16} /></span>
                    <input
                        id="name"
                        className={`input ${errors.name ? "input-error" : ""}`}
                        placeholder=" "
                        required
                        onChange={(e) => {
                            setName(e.target.value);
                            clearError("name");
                        }}
                    />
                    <label htmlFor="name" className="label">Nome</label>
                </div>
                {errors.name && (
                    <p className="error-text">{errors.name}</p>
                )}
            </div>

            <div className="field">
                <div className="input-wrapper">
                    <span className="icon"><Mail size={16} /></span>
                    <input
                        id="email"
                        className={`input ${errors.email ? "input-error" : ""}`}
                        type="email"
                        placeholder=" "
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                            clearError("email");
                        }}
                    />
                    <label htmlFor="email" className="label">Email</label>
                </div>
                {errors.email && (
                    <p className="error-text">{errors.email}</p>
                )}
            </div>
            <div className="field">
                <div className="input-wrapper">

                    {/* empty space to align with icon */}
                    <span className="icon placeholder-icon"></span>
                    <input
                        id="date"
                        type="date"
                        className={`input ${errors.date ? "input-error" : ""}`}

                        placeholder=" "
                        onChange={(e) => {
                            setDate(e.target.value);
                            clearError("date");
                        }}
                        min={new Date().toISOString().split("T")[0]}
                    />

                    <label htmlFor="date" className="label">
                        Data
                    </label>
                </div>
                {errors.date && (
                    <p className="error-text">{errors.date}</p>
                )}
            </div>
            <div className="field">
                <div className="input-wrapper">
                    <span className="icon"><Clock size={16} /></span>

                    <select
                        id="time"
                        className={`input select ${errors.time ? "input-error" : ""}`}
                        onChange={(e) => {
                            setTime(e.target.value);
                            clearError("time");
                        }}
                        value={time}
                        disabled={availableTimes.length === 0}
                    >
                        <option value="" disabled hidden>
                            {availableTimes.length === 0
                                ? "Nenhum horário disponível"
                                : "Selecione horário"}
                        </option>

                        {availableTimes.map((t) => (
                            <option key={t}>{t}</option>
                        ))}
                    </select>

                    <label htmlFor="time" className="label">
                        Horário
                    </label>
                </div>
                {errors.time && (
                    <p className="error-text">{errors.time}</p>
                )}
            </div>

            <button className="button"
                onClick={handleSubmit}>{loading ? "Agendando..." : "Agendar"}
            </button>

            {message && <p className={`message ${error ? "error" : "success"}`}>{message}</p>}
        </div>
    );
}