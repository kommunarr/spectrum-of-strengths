import { Link } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";

function Header() {
    function openAddEmailPrompt() {
      console.log('Email collected');
    }

    return (
        <>
          <div id="header">
            <Logo />
            {/* other elements */}
    
            <nav className="navigationMenu">
              <ul className="navigationMenuHeadings">
                <li>
                  <Link className="menuLink" to={``}>Home</Link>
                </li>
                <li>
                  <Link className="menuLink" to={`about`}>About</Link>
                </li>
                <li>
                  <Link className="menuLink" to={`contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </nav>
    
            <div className="actionSection">
              <button className="actionButton" onClick={openAddEmailPrompt}>
                Join
              </button>
            </div>
          </div>
        </>
    );
}

export default Header;