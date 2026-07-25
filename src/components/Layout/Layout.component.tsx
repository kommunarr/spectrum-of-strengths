import React from "react";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../Footer"
import Header from "../Header";
import NavMenu from "../NavMenu";
import './Layout.css';
import EmailModal from "../EmailModal";

interface IRootRoute {
    outlet?: React.JSX.Element;
}
  
function Layout(props: IRootRoute) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEmailPromptOpen, setIsEmailPromptOpen] = useState(false);
    const emailTriggerRef = React.useRef<HTMLElement | null>(null);
    const mobileMenuTriggerRef = React.useRef<HTMLButtonElement | null>(null);
    const wasMobileMenuOpenRef = React.useRef(false);
  
    const location = useLocation();
    const { t } = useTranslation(['common']);
  
    useEffect(() => {
      setIsMobileMenuOpen(false);
    }, [location]);
    
    useEffect(() => {
      if (!isMobileMenuOpen) return;

      const mobileNavigation = document.getElementById('mobile-navigation');
      mobileNavigation?.querySelector<HTMLElement>('a[href], button:not([disabled])')?.focus();

      function closeMenuOnEscape(event: KeyboardEvent) {
        if (event.key === 'Escape' && !isEmailPromptOpen) {
          event.preventDefault();
          setIsMobileMenuOpen(false);
        }
      }

      function closeMenuOnDesktopResize() {
        if (window.innerWidth > 750) {
          setIsMobileMenuOpen(false);
        }
      }

      wasMobileMenuOpenRef.current = true;
      document.addEventListener('keydown', closeMenuOnEscape);
      window.addEventListener('resize', closeMenuOnDesktopResize);
      return () => {
        document.removeEventListener('keydown', closeMenuOnEscape);
        window.removeEventListener('resize', closeMenuOnDesktopResize);
      };
    }, [isEmailPromptOpen, isMobileMenuOpen]);

    useEffect(() => {
      if (isMobileMenuOpen || !wasMobileMenuOpenRef.current) return;

      wasMobileMenuOpenRef.current = false;
      window.requestAnimationFrame(() => {
        if (window.innerWidth <= 750) {
          mobileMenuTriggerRef.current?.focus();
        }
      });
    }, [isMobileMenuOpen, isEmailPromptOpen]);
  
    function toggleMobileMenu(): void {
      setIsMobileMenuOpen((isOpen) => !isOpen);
    }
  
    function openAddEmailPrompt(event: React.MouseEvent<HTMLButtonElement>) {
      emailTriggerRef.current = event.currentTarget;
      setIsEmailPromptOpen(true);
    }

    return (
        <>
            <a className="skipLink" href="#main-content">{t('skipToContent')}</a>
            <div className={"headerAndMain" + (isMobileMenuOpen ? " mobileMenuOpen" : '')}>
                <Header
                    openAddEmailPrompt={openAddEmailPrompt}
                    toggleMobileMenu={toggleMobileMenu}
                    isMobileMenuOpen={isMobileMenuOpen}
                    mobileMenuTriggerRef={mobileMenuTriggerRef}
                />
                <main id="main-content" tabIndex={-1}>
                <div className="outlet">
                    {props.outlet ?? <Outlet />}
                </div>
                </main>
                <NavMenu
                    id="mobile-navigation"
                    hidden={!isMobileMenuOpen}
                    openAddEmailPrompt={openAddEmailPrompt}
                />
            </div>
            <EmailModal
                showModal={isEmailPromptOpen}
                setShowModal={setIsEmailPromptOpen}
                returnFocusRef={emailTriggerRef}
            />
            <Footer openAddEmailPrompt={openAddEmailPrompt} />
        </>
    );
}

export default Layout;
