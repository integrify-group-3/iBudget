import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  getRepository,
  DeleteResult,
} from 'typeorm'
import { Movie } from '../entity/Movie'

function create(movie: Movie): Promise<Movie> {
  const MovieRepository = getRepository(Movie)
  return MovieRepository.save(movie)
}

function findById(movieId: string): Promise<Movie> {
  const MovieRepository = getRepository(Movie)
  return MovieRepository.findOne(movieId).then((movie) => {
    if (!movie) {
      throw new Error(`Movie ${movieId} not found`)
    }
    return movie
  })
}

function findAll(): Promise<Movie[]> {
  const MovieRepository = getRepository(Movie)
  return MovieRepository.find() // Return a Promise
}

function update(movieId: string, update: Partial<Movie>): Promise<Movie> {
  const MovieRepository = getRepository(Movie)
  return MovieRepository.findOne(movieId).then((movie) => {
    if (!movie) {
      throw new Error(`Movie ${movieId} not found`)
    }

    if (update.name) {
      movie.name = update.name
    }
    if (update.publishedYear) {
      movie.publishedYear = update.publishedYear
    }
    if (update.duration) {
      movie.duration = update.duration
    }

    // Add more fields here if needed
    return MovieRepository.save(movie)
  })
}

function deleteMovie(movieId: string): Promise<DeleteResult> {
  const MovieRepository = getRepository(Movie)
  return MovieRepository.delete(movieId)
  /*  .createQueryBuilder()
    .delete()
    .where('id=:id', { id: movieId })
    .execute() */
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteMovie,
}
