import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

function Account() {
  const location = useLocation();
  const activeSubpage = location.pathname.split('/')[2] || 'profile';

  function MouseOver(event) {
    event.currentTarget.style.background = '#FF385C';
    event.currentTarget.style.color = '#FFFFFF';
    event.currentTarget.style.transform = 'scale(1.05)';
  }

  function MouseOut(event) {
    const linkType = event.currentTarget.getAttribute('data-type');
    if (linkType !== activeSubpage) {
      event.currentTarget.style.background = '';
      event.currentTarget.style.color = '';
      event.currentTarget.style.transform = '';
    }
  }

  React.useEffect(() => {
    const allLinks = document.querySelectorAll('[data-type]');
    allLinks.forEach(link => {
      link.style.background = '';
      link.style.color = '';
      link.style.transform = '';
      link.style.boxShadow = '';
    });

    const activeLink = document.querySelector(`[data-type="${activeSubpage}"]`);
    if (activeLink) {
      activeLink.style.background = '#FF385D';
      activeLink.style.color = '#FFFFFF';
      activeLink.style.transform = 'scale(1.05)';
    }
  }, [activeSubpage]);

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-center gap-9 m-8 overflow-hidden">
        {[
          { to: '/account/profile', type: 'profile', label: 'My Profile', iconPath: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' },
          { to: '/account/booking', type: 'booking', label: 'My Booking', iconPath: 'M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' },
          { to: '/account/accomodation', type: 'accomodation', label: 'My Accommodations', iconPath: 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819' },
        ].map(link => (
          <Link
            key={link.type}
            to={link.to}
            className="py-2 px-4 rounded-full transition duration-200 ease-in-out flex items-center gap-2"
            onMouseOver={MouseOver}
            onMouseOut={MouseOut}
            data-type={link.type}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={link.iconPath} />
            </svg>
            {link.label}
          </Link>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

export default Account;
