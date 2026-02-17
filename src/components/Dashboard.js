import React, { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';
import { useLocation } from "react-router-dom";
import ToastMessage from "./ToastMessage";
import Loader from './Loader';


const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('ALL'); // State for filtering
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async () => {
        try {
            setLoading(true);
            const res = await MovieService.getMovies();
            console.log(res.data.moviesList)
            setMovies(res.data.moviesList || []);
        } catch (err) {
            console.log("Error loading movies", err);
        } finally {
            setLoading(false);
        }
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
            {/* ✅ Toast Message should be here */}
            <ToastMessage
                message={location.state?.toastMessage}
                type={location.state?.toastType || "success"}
            />

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

            {loading ? (
                <Loader text="🎬 Loading your cinema library..." />
            ) : (
                <>
                    {/* ✅ MOBILE VIEW (Cards) */}
                    <div className="d-block d-lg-none">
                        <div className="row">
                            {filteredMovies.length > 0 ? filteredMovies.map(movie => (
                                <div key={movie.id} className="col-12 mb-4">
                                    <div className={`card h-100 ${movie.status === 'WATCHED' ? 'opacity-75' : ''}`}>
                                        <div className="card-body d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="card-title text-white">{movie.title}</h5>
                                                <span className="text-light small" style={{ "fontWeight": "bold" }}>{movie.releaseYear || "N/A"}</span>
                                            </div>

                                            <p className="card-text text-secondary mt-2 flex-grow-1" style={{ fontSize: "0.9rem" }}>
                                                {movie.description || "No description provided."}
                                            </p>

                                            <div className="mt-3">
                                                <div className="btn-group w-100">
                                                    <button
                                                        onClick={() => handleStatusChange(movie.movieUID, "DOWNLOADED")}
                                                        className={`btn btn-sm btn-outline-primary ${movie.status === "DOWNLOADED" ? "active" : ""}`}
                                                    >
                                                        Downloaded
                                                    </button>

                                                    {movie.status === "DOWNLOADED" && (
                                                        <button
                                                            onClick={() => handleStatusChange(movie.movieUID, "WATCHED")}
                                                            className={`btn btn-sm btn-outline-success ${movie.status === "WATCHED" ? "active" : ""}`}
                                                        >
                                                            Watched
                                                        </button>
                                                    )}
                                                </div>

                                                {movie.lastWatchedAt && (
                                                    <div className="text-center mt-2">
                                                        <small className="text-success">
                                                            ✔ Watched on{" "}
                                                            {new Date(movie.lastWatchedAt).toLocaleString("en-IN", {
                                                                dateStyle: "medium",
                                                                timeStyle: "short",
                                                            })}
                                                        </small>
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


                    {/* ✅ DESKTOP VIEW (Table) */}
                    <div className="d-none d-lg-block">
                        {filteredMovies.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-dark table-hover align-middle custom-table">
                                    <thead>
                                        <tr className="text-info">
                                            <th>Title</th>
                                            <th>Year</th>
                                            <th>Description</th>
                                            <th>Status</th>
                                            <th>Last Watched</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredMovies.map(movie => (
                                            <tr key={movie.id} className={movie.status === "WATCHED" ? "watched-row" : ""}>
                                                <td className="fw-bold text-white">{movie.title}</td>
                                                <td className="text-secondary">{movie.releaseYear}</td>
                                                <td className="text-secondary" style={{ maxWidth: "350px" }}>
                                                    {movie.description || "No description provided."}
                                                </td>
                                                <td>
                                                    <span className="badge bg-info text-dark">
                                                        {movie.status}
                                                    </span>
                                                </td>
                                                <td className="text-success">
                                                    {movie.lastWatchedAt ? (
                                                        <small className="text-success">
                                                            {new Date(movie.lastWatchedAt).toLocaleString("en-IN", {
                                                                dateStyle: "medium",
                                                                timeStyle: "short",
                                                            })}
                                                        </small>
                                                    ) : "-"}

                                                </td>
                                                <td>
                                                    <div className="btn-group">
                                                        <button
                                                            onClick={() => handleStatusChange(movie.movieUID, "DOWNLOADED")}
                                                            className={`btn btn-sm btn-outline-primary ${movie.status === "DOWNLOADED" ? "active" : ""}`}
                                                        >
                                                            Downloaded
                                                        </button>

                                                        {movie.status !== "WATCHED" && (
                                                            <button
                                                            onClick={() => handleStatusChange(movie.movieUID, "WATCHED")}
                                                            className="btn btn-sm btn-outline-success"
                                                        >
                                                            Mark Watched
                                                        </button>)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-secondary">No movies found in this category.</p>
                            </div>
                        )}
                    </div>
                </>
            )}

        </div>
    );
};

export default Dashboard;