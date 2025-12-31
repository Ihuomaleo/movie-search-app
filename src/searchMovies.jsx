import React, { useState } from "react";
import MovieCard from "./movieCard";

export default function SearchMovies() {
    
    // States for search query, the movie list, and status tracking
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const searchMovies = async (e) => {
        e.preventDefault();
        
        if (!query) return;

        setLoading(true);
        setHasSearched(true);
                
        // Pulling the API Key securely from Vite's environment variables
        const apiKey = import.meta.env.VITE_TMDB_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
        
        try {
            const res = await fetch(url);
            const data  = await res.json();
            setMovies(data.results || []);
            setLoading(false);
        } catch(err) {
            console.error(err);
            setLoading(false);
        }
    }
    
    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input 
                    className="input" 
                    type="text" 
                    name="query"
                    placeholder="Type a movie name..."
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="button" type="submit">Search</button>
            </form>

            <div className="card-list">
                {/* 1. Show loading text while fetching */}
                {loading && <p className="loading">Searching for movies...</p>}

                {/* 2. Show error ONLY if search is finished and results are empty */}
                {!loading && hasSearched && movies.filter(movie => movie.poster_path).length === 0 && (
                    <p className="error">No movies found. Try another search!</p>
                )}

                {/* 3. Render results using the MovieCard component */}
                {!loading && movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>    
        </>
    )
}