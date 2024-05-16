import { Link } from "react-router-dom";
import './Header.css';

function Header() {
    return (
        <>
          <div id="header">
            {/* other elements */}
    
            <nav>
              <ul>
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