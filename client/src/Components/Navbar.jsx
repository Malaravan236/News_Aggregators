// // src/components/Navbar.jsx
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaNewspaper } from 'react-icons/fa'; 
// import { UserContext } from '../context/UserContext';
// import './Navbar.css';

// const Navbar = () => {
//   const { userEmail, logout } = useContext(UserContext); // Access userEmail and logout from context

//   return (
//     <nav className="navbar1">
//       <div className="logo1">GlobalGlimpse</div>
//       <div className="nav-links1">
//         <Link to="/home" className="nav-link1">
//           <FaHome /> &nbsp;Home
//         </Link>
       
//         <Link to="/news" className="nav-link1">
//           <FaNewspaper /> &nbsp;News
//         </Link>
//         <Link to="/country" className="nav-link1">
//           <FaNewspaper /> &nbsp;Country News
//         </Link>
//         <Link to="/weather" className="nav-link1">
//           <FaNewspaper /> &nbsp;Weather
//         </Link>
//         {userEmail ? (
//           <>
//             <span className="nav-link1">
//               <FaUserCircle /> &nbsp;{userEmail} {/* Display user email */}
//             </span>
//             <Link to="/" className="nav-link1" onClick={logout}>
//               <FaSignOutAlt /> &nbsp;Logout
//             </Link>
//           </>
//         ) : (
//           <>
//             <Link to="/login" className="nav-link1">
//               <FaSignInAlt /> &nbsp;Login
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaNewspaper } from 'react-icons/fa'; 
import { UserContext } from '../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { userEmail, logout } = useContext(UserContext); // Access userEmail and logout from context
  const [isNavbarOpen, setIsNavbarOpen] = useState(false); // State for toggling navbar

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen); // Toggle navbar visibility
  };

  return (
    <nav className={`navbar1 ${isNavbarOpen ? 'active' : ''}`}>
      <div className="logo1">GlobalGlimpse</div>
      
      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleNavbar}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links1 ${isNavbarOpen ? 'active' : ''}`}>
        <Link to="/home" className="nav-link1">
          <FaHome /> &nbsp;Home
        </Link>
       
        <Link to="/news" className="nav-link1">
          <FaNewspaper /> &nbsp;News
        </Link>
        <Link to="/country" className="nav-link1">
          <FaNewspaper /> &nbsp;Country News
        </Link>
        <Link to="/weather" className="nav-link1">
          <FaNewspaper /> &nbsp;Weather
        </Link>
        {userEmail ? (
          <>
            <span className="nav-link1">
              <FaUserCircle /> &nbsp;{userEmail} {/* Display user email */}
            </span>
            <Link to="/" className="nav-link1" onClick={logout}>
              <FaSignOutAlt /> &nbsp;Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link1">
              <FaSignInAlt /> &nbsp;Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
