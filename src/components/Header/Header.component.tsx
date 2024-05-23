import { Link } from "react-router-dom";
import './Header.css';
import Logo from "../Logo";

function Header() {
    return (
        <>
          <div id="header">
            <Logo />
            {/* other elements */}
    
            <nav className="navigationMenu">
              <ul className="navigationMenuHeadings">
                <li>
                  <Link to={``}>Home</Link>
                </li>
                <li>
                  <Link to={`about`}>About</Link>
                </li>
                <li>
                  <Link to={`contact-us`}>Contact Us</Link>
                </li>
              </ul>
            </nav>
    
            {/* other elements */}
          </div>
        </>
    );
}

export default Header;