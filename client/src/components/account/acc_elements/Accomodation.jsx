import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Places from './Places';

function Accomodation() {
  const location = useLocation();
  const activeSubpage = location.pathname.split('/').length === 4 ? location.pathname.split('/')[3] : 'accomodation';

  function choice() {
      return (
        <div className="container mx-auto px-4">
          <div className='text-center'>
            <Link to={'/account/accomodation/new'} className='bg-primary text-white py-2 px-6 rounded-full inline-flex'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add new place
            </Link>
          </div>
          <Places/>
        </div>
      );
  }

  return (
    <div>{choice()}</div>
  );
}

export default Accomodation;
