import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
        <Link to="/">Dashboard</Link>
        </li>
        {/* Add additional links for the dashboard or user profile */}
      </ul>
    </nav>
  );
}

export default Navbar;