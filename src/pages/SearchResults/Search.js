import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Access the search query from the URL
    const query = new URLSearchParams(window.location.search).get('query');
    setSearchQuery(query);

    // Fetch search results based on the query
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=6cde7a66b7d3efec6a840e68f2d94559&query=${query}`);
        const data = await response.json();

        // Check if there are any results
        if (data.results.length === 0) {
          setError("No results found");
        } else {
          setSearchResults(data.results);
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError("An error occurred while fetching results");
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h4 className='fw-bold'>SEARCH RESULTS</h4>

        {error ? (
          <p>{error}</p>
        ) : (
          <div className="row mt-4">
            {searchResults.map((result) => (
              <Link to={`/detail/${result.id}`} key={result.id} className="col-3 topTrendingCard text-decoration-none">
                {/* Adjust the rendering based on the actual structure of your search result data */}
                {result.media_type === 'movie' || result.media_type === 'tv' ? (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                      alt={`${result.title || result.name} Poster`}
                      className="img-fluid w-100" style={{ height: "50vh" }}
                    />

                    <h6 className='text-primary text-center mt-3'>{result.title || result.name}</h6>
                  </>
                ) : (
                  <p>No preview available for this media type</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
