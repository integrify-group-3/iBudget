"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Movie_1 = require("../entity/Movie");
function create(movie) {
    const MovieRepository = typeorm_1.getRepository(Movie_1.Movie);
    return MovieRepository.save(movie);
}
function findById(movieId) {
    const MovieRepository = typeorm_1.getRepository(Movie_1.Movie);
    return MovieRepository.findOne(movieId).then((movie) => {
        if (!movie) {
            throw new Error(`Movie ${movieId} not found`);
        }
        return movie;
    });
}
function findAll() {
    const MovieRepository = typeorm_1.getRepository(Movie_1.Movie);
    return MovieRepository.find(); // Return a Promise
}
function update(movieId, update) {
    const MovieRepository = typeorm_1.getRepository(Movie_1.Movie);
    return MovieRepository.findOne(movieId).then((movie) => {
        if (!movie) {
            throw new Error(`Movie ${movieId} not found`);
        }
        if (update.name) {
            movie.name = update.name;
        }
        if (update.publishedYear) {
            movie.publishedYear = update.publishedYear;
        }
        if (update.duration) {
            movie.duration = update.duration;
        }
        // Add more fields here if needed
        return MovieRepository.save(movie);
    });
}
function deleteMovie(movieId) {
    const MovieRepository = typeorm_1.getRepository(Movie_1.Movie);
    return MovieRepository.delete(movieId);
}
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteMovie,
};
//# sourceMappingURL=movie.js.map