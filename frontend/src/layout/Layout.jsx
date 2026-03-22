import { Outlet, useLocation, Link } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="app-container">
      <nav className="navbar">
        <h2 className="logo">Clinic</h2>

        <div className="nav-links">
          <Link
            to="/"
            className={`nav-button ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/booking"
            className={`nav-button ${location.pathname === "/booking" ? "active" : ""}`}
          >
            Booking
          </Link>
        </div>
      </nav>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}