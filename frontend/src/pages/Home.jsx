import { Link } from "react-router-dom";

export default function Home() {
    return (
            <div className="home">

                <section className="hero">
                    <h1>Modern Clinic</h1>
                    <p>Professional care for your health</p>
                    <Link to="/booking" className="button">Book Appointment</Link>
                </section>

                <div className="services">
                    <h2>Our Services</h2>

                    <div className="services-container">
                        <div className="card">General Consultation</div>
                        <div className="card">Dental Cleaning</div>
                        <div className="card">Whitening</div>
                    </div>
                </div>

                <section className="cta">
                    <h2>Schedule your visit today</h2>
                    <Link to="/booking" className="button">Book Now</Link>
                </section>

        </div>

    );
}