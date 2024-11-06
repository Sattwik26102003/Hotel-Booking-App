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
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out flex gap-2"
          to={'/account/profile'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="profile"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

          My Profile
        </Link>
        <Link
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out flex gap-2"
          to={'/account/booking'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="booking"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

          My Booking
        </Link>
        <Link
          className="py-2 px-4 rounded-full transition duration-200 ease-in-out flex gap-2"
          to={'/account/accomodation'}
          onMouseOver={MouseOver}
          onMouseOut={MouseOut}
          data-type="accomodation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>

          My Accommodations
        </Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Account;