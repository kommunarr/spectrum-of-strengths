import { Link } from "react-router-dom";
import './Logo.css';

function Logo() {
    return (
        <>
            <Link to={``}>
            <img src="src/assets/SpectrumOfStrengthsLogo.svg" className="logo" alt="" />
            </Link>
        </>
    );
}

export default Logo;