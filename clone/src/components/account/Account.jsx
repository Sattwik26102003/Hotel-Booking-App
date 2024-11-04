import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';

function Account() {
  const location = useLocation();
  // Extract the subpage from the pathname
  const activeSubpage = location.pathname.split('/')[2] || 'profile';
  
  console.log("Current pathname:", location.pathname);
  console.log("Active subpage:", activeSubpage);

  function MouseOver(event) {
    event.target.style.background = '#FF385C';
    event.target.style.color = '#FFFFFF';
    event.target.style.transform = 'scale(1.05)';
    event.target.style.boxShadow = '0px 4px 12px rgba(59, 130, 246, 0.3)';
  }

  function MouseOut(event) {
    const linkType = event.target.getAttribute('data-type');
    if (linkType !== activeSubpage) {
      event.target.style.background = '';
      event.target.style.color = '';
      event.target.style.transform = '';
      event.target.style.boxShadow = '';
    }
  }

  // Set initial styles for active link when component mounts or location changes
  React.useEffect(() => {
    // First, reset all links
    const allLinks = document.querySelectorAll('[data-type]');
    allLinks.forEach(link => {
      link.style.background = '';
      link.style.color = '';
      link.style.transform = '';
      link.style.boxShadow = '';
    });

    // Then set active link
    const activeLink = document.querySelector(`[data-type="${activeSubpage}"]`);
    if (activeLink) {
      activeLink.style.background = '#FF385C';
      activeLink.style.color = '#FFFFFF';
      activeLink.style.transform = 'scale(1.05)';
      activeLink.style.boxShadow = '0px 4px 12px rgba(59, 130, 246, 0.3)';
    }
  }, [activeSubpage]);

  return (
    <div>
      <nav className="w-full flex justify-center gap-9 m-8">
        <Link
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out"
          to={'/account/profile'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="profile"
        >
          My Profile
        </Link>
        <Link
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out"
          to={'/account/booking'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="booking"
        >
          My Booking
        </Link>
        <Link
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out"
          to={'/account/accomodation'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="accomodation"
        >
          My Accommodations
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Account;