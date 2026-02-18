import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

// This interceptor automatically grabs the token from storage 
// and puts it in the 'Authorization' header for every request
axios.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

class MovieService {
    // Aligns with your @GetMapping("/movies") in UserController
    getMovies() { 
        return axios.get(`${API_BASE_URL}/user/movies`); 
    }

    // Aligns with the @PostMapping("/movies") we just created
    addMovie(movieData) { 
        return axios.post(`${API_BASE_URL}/user/movies/create`, movieData); 
    }

    // Aligns with the PATCH endpoint for updating status
    updateStatus(id, status) { 
        return axios.patch(`${API_BASE_URL}/user/movies/${id}/status/${status}`); 
    }
}

// ✅ assign instance to a variable first
const movieService = new MovieService();

export default movieService;