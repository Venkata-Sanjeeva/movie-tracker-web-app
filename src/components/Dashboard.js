import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('ALL'); // State for filtering

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        const res = await MovieService.getMovies();
        console.log("Movies loaded:", res.data); // Debug log to check data structure
        setMovies(res.data.moviesList || []); // Adjust based on your actual response structure
    };

    const handleStatusChange = async (id, newStatus) => {
        await MovieService.updateStatus(id, newStatus);
        loadMovies();
    };

    // Filter logic
    const filteredMovies = movies.filter(movie => 
        filter === 'ALL' ? true : movie.status === filter
    );

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-info">My Cinema Library</h2>
                
                {/* Filter Button Group */}
                <div className="btn-group shadow">
                    <button className={`btn btn-sm ${filter === 'ALL' ? 'btn-info' : 'btn-outline-secondary'}`} onClick={() => setFilter('ALL')}>All</button>
                    <button className={`btn btn-sm ${filter === 'WANT_TO_DOWNLOAD' ? 'btn-info' : 'btn-outline-secondary'}`} onClick={() => setFilter('WANT_TO_DOWNLOAD')}>Wishlist</button>
                    <button className={`btn btn-sm ${filter === 'DOWNLOADED' ? 'btn-info' : 'btn-outline-secondary'}`} onClick={() => setFilter('DOWNLOADED')}>Ready</button>
                    <button className={`btn btn-sm ${filter === 'WATCHED' ? 'btn-info' : 'btn-outline-secondary'}`} onClick={() => setFilter('WATCHED')}>Watched</button>
                </div>
            </div>

            <div className="row">
                {filteredMovies.length > 0 ? filteredMovies.map(movie => (
                    <div key={movie.id} className="col-md-4 mb-4">
                        <div className={`card h-100 ${movie.status === 'WATCHED' ? 'opacity-75' : ''}`}>
                            <div className="card-body d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-start">
                                    <h5 className="card-title text-white">{movie.title}</h5>
                                    <span className="text-muted small">{movie.release_year}</span>
                                </div>
                                
                                <p className="card-text text-secondary mt-2 flex-grow-1" style={{fontSize: '0.9rem'}}>
                                    {movie.description || "No description provided."}
                                </p>
                                
                                <div className="mt-3">
                                    <div className="btn-group w-100">
                                        <button onClick={() => handleStatusChange(movie.movieUID, 'DOWNLOADED')} 
                                            className={`btn btn-sm btn-outline-primary ${movie.status === 'DOWNLOADED' ? 'active' : ''}`}>
                                            Downloaded
                                        </button>
                                        <button onClick={() => handleStatusChange(movie.movieUID, 'WATCHED')} 
                                            className="btn btn-sm btn-outline-success">
                                            Mark Watched
                                        </button>
                                    </div>
                                    {movie.lastWatchedDate && (
                                        <div className="text-center mt-2">
                                            <small className="text-success">✔ Watched on {new Date(movie.lastWatchedDate).toLocaleDateString()}</small>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-5">
                        <p className="text-secondary">No movies found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;