import React, { useState } from 'react';
import MovieService from '../services/MovieService';

const AddMovie = () => {
    const [movie, setMovie] = useState({ title: '', description: '', release_year: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the payload to match your Spring Boot Entity
        const moviePayload = {
            title: movie.title,
            description: movie.description,
            releaseYear: parseInt(movie.release_year), // Ensure it's a number for Java Integer
            status: 'WANT_TO_DOWNLOAD' // Default status
        };

        try {
            const response = await MovieService.addMovie(moviePayload);
            console.log("Response from server:", response.data);
            alert("Movie saved to your personal list!");

            // Reset form
            setMovie({ title: '', description: '', release_year: '' });
        } catch (error) {
            console.error("Submission error:", error.response);
            alert(error.response?.data || "Failed to add movie. Are you logged in?");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Notice we use 'card' here to match your CSS file */}
                    <div className="card p-4 shadow">
                        <h3 className="text-info mb-4 text-center">Add New Discovery</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label text-secondary">Movie Name</label>
                                <input className="form-control" placeholder="What's the full title?"
                                    value={movie.title} onChange={e => setMovie({ ...movie, title: e.target.value })} required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-secondary">Shorts Context</label>
                                <textarea className="form-control" rows="3"
                                    placeholder="Write a scene from the YT Short so you don't forget!"
                                    value={movie.description} onChange={e => setMovie({ ...movie, description: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-secondary">Release Year</label>
                                <input className="form-control" type="number" placeholder="YYYY"
                                    value={movie.release_year} onChange={e => setMovie({ ...movie, release_year: e.target.value })} />
                            </div>

                            {/* Changed btn-primary to btn-info for the Cyan look in your CSS */}
                            <button type="submit" className="btn btn-info w-100 fw-bold mt-2">Add to Library</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;