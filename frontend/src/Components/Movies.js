import React, { useEffect, useState } from "react";
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("Best Rank");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    setLoading(true);
    fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: "kannada",
        genre: "all",
        sort: "voting",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.result);
        setLoading(false);
        if (data.result) {
          setMovies(data.result);
        } else {
          setError("No movies found.");
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Error fetching movies data.");
      });
  };


  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; 
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date"; 
    return date.toLocaleDateString("en-GB"); 
  };

  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    if (option === "Best Rank") {
      const sortedMovies = [...movies].sort((a, b) => b.voting - a.voting);
      setMovies(sortedMovies);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    
    <div className="movies-container">
      <div className='menu'> <button onClick={()=>navigate('/info')} className='btn'>Company Info</button> 
      <button onClick={()=>navigate('/users')} className='btn1'>Registered Users </button>
      </div>
      <h2 className="text-center">List of Kannada Movies</h2>
      <div className="sort-section">
        <label htmlFor="sort-by" className="sort-label">
          Sort By
        </label>
        <select id="sort-by" value={sortOption} onChange={handleSortChange} className="sort-dropdown">
          <option value="Best Rank">Best Rank</option>
        </select>
      </div>
      {movies.map((movie, index) => (
        <div key={index} className="movie-item">
          <div className="rank">{index + 1}</div>
          <div className="movie-content">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-details">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-info">
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p className="movie-info">
                <strong>Language:</strong> {movie.language}
              </p>
              <p className="movie-info">
                <strong>Director:</strong> {movie.director}
              </p>
              <p className="movie-info">
                <strong>Release Date:</strong> {formatDate(movie.releasedDate)}
              </p>
            </div>
            <div className="movie-votes">
  <div className="votes-container upvote">
    <span className="vote-count">{movie.voting || 0}</span>
    <span className="thumb-icon"><GoThumbsup size={30}/></span>
  </div>
  <div className="votes-container downvote">
    <span className="vote-count">{movie.downvotes || 0}</span>
    <span className="thumb-icon"><GoThumbsdown size={30} /></span>
  </div>
</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
