import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('Username');
    navigate('/login')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Sticky note
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">
                  Notes
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/addnote' ? "active" : ""}`} to="/addnote">
                  Add note
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex">
                <Link role="button" className={`btn ${location.pathname === '/login' ? "btn-dark" : "btn-outline-dark"} mx-2`} to={"/login"}>Login</Link>
                <Link role="button" className={`btn ${location.pathname === '/signup' ? "btn-dark" : "btn-outline-dark"} mx-2`} to={"/signup"}>Sign up</Link>
              </form> :
              <>
                <span className="badge bg-light text-dark" style={{ "fontSize": "1.2em" }}>{localStorage.getItem('Username')}</span>
                <button className="btn btn-outline-dark mx-2" onClick={handleLogout}>Logout</button>
              </>}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
