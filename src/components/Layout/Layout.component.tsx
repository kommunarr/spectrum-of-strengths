import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import NavMenu from "../NavMenu";
import './Layout.css';

interface IRootRoute {
    outlet?: React.JSX.Element;
}
  
function Layout(props: IRootRoute) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const location = useLocation();
  
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [location]);
    
    const hideMobileMenuOnResize = React.useCallback(() => {
      if (window.innerWidth > 750) {
        setIsMobileMenuOpen(false)
        window.removeEventListener('resize', hideMobileMenuOnResize);
      }
    }, []);
  
    function toggleMobileMenu(): void {
      if (!isMobileMenuOpen) {
        window.addEventListener('resize', hideMobileMenuOnResize);
      } else {
        window.removeEventListener('resize', hideMobileMenuOnResize);
      }
    
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  
    function openAddEmailPrompt() {
      console.log('Email collected');
    }

    return (
        <>
            <div className={"headerAndMain" + (isMobileMenuOpen ? " mobileMenuOpen" : '')}>
                <Header openAddEmailPrompt={openAddEmailPrompt} toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
                <main>
                <div className="outlet">
                    {props.outlet ?? <Outlet />}
                </div>
                {isMobileMenuOpen && <NavMenu openAddEmailPrompt={openAddEmailPrompt} />}
                </main>
            </div>
            <Footer openAddEmailPrompt={openAddEmailPrompt} />
        </>
    );
}

export default Layout;