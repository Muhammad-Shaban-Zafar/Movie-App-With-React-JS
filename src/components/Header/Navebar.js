
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

export default function Navebar() {

  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect to search results page with the search query
    navigate(`/search-results?query=${searchQuery}`);
  };

  const handleKeyDown = (event) => {
    // If Enter key is pressed, trigger search
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow${scrolled ? ' fixed-top' : ''}`}>

        <div className="container">

          <Link to='/' className="navbar-brand fw-bold fs-1" href="#"> <span className='text-dark'>Flixi</span><span className='text-primary'>fy</span></Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0 px-5">

              <li className="nav-item px-2">
                <Link to="/" className="nav-link fw-bold" aria-current="page" href="#">HOME</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/movies" className="nav-link fw-bold" aria-current="page" href="#">MOVIES</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/tvSeries" className="nav-link fw-bold" aria-current="page" href="#">TV SERIES</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/live" className="nav-link fw-bold" aria-current="page" href="#">LIVE</Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/all" className="nav-link fw-bold" aria-current="page" href="#">ALL</Link>
              </li>
            </ul>

            <div className="d-flex">
              {/* <button className='btn btn-primary fw-bold rounded-1 mx-1'>sign in</button>
              <button className='btn btn-primary fw-bold rounded-1 mx-1'>sign up</button> */}
              <div className="input-group">
                <input
                  type="text"
                  placeholder="search"
                  className="form-control rounded-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown} // Handle Enter key press
                />
                <button className="btn btn-sm btn-primary rounded-0" onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>

          </div>

        </div>

      </nav>

    </>
  )
}
