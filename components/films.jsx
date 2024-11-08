import { useState, useEffect } from "react";
import styles from '../styles/film.module.css'

export function Films() {
    const apiKey = '74d0dcc3'; 
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);

    const searchFilm = async () => {
        try {
            const response = await fetch(`https://omdbapi.com/?s=${searchTerm}&page=1&apikey=${apiKey}`);
            const data = await response.json();
            setMovies(data.Search || []);
        } catch (error) {
            console.error('Произошла ошибка', error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            searchFilm();
        }
    }, [searchTerm]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Movie Search</h1>
                <input className={styles.input}
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            <ul className={styles.list}>
                {movies.map(movie => (
                    <li key={movie.imdbID} className={styles.item}>
                        <img 
                            src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} 
                            alt={movie.Title} 
                        />
                        <div>
                            <h3 className="movie-title">{movie.Title} ({movie.Year})</h3>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}