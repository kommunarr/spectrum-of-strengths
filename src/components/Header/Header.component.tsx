import { Link, useLocation } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";

function Header() {
    function openAddEmailPrompt() {
      console.log('Email collected');
    }

    const location = useLocation();

    return (
        <>
          <div id="header">
            <Logo />
            {/* other elements */}
    
            <nav className="navigationMenu">
              <ul className="navigationMenuHeadings">
                <li>
                  <Link className="actionLink" to={``}>Home</Link>
                </li>
                <li>
                  <Link className="actionLink" to={`about`}>About</Link>
                </li>
                <li>
                  <Link className="actionLink" to={`contact-us`}>Contact</Link>
                </li>
              </ul>
            </nav>
    
            <div className="actionSection">
              <Link className="actionLink languageLink" to={`fr${location.pathname}`}>Français</Link>
              <button className="actionButton" onClick={openAddEmailPrompt}>
                Join
              </button>
            </div>
          </div>
        </>
    );
}

export default Header;