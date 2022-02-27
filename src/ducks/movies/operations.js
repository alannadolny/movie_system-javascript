import { createAction } from 'redux-api-middleware';
import { schema, normalize } from 'normalizr';
import types from './types';
import errorTypes from '../errors/types';

const movieSchema = new schema.Entity('movies');
const moviesSchema = new schema.Array(movieSchema);

export const getMoviesList = () => {
  return createAction({
    endpoint: 'http://localhost:5000/api/movies',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.MOVIE_LIST_REQUEST,
      {
        type: types.MOVIE_LIST_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, moviesSchema);
          return entities;
        },
        meta: {
          actionType: types.GET_ALL,
          errorType: errorTypes.WITHOUT_ERROR,
        },
      },
      {
        type: types.MOVIE_LIST_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const addMovie = (movie) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
    types: [
      types.ADD_MOVIE_REQUEST,
      {
        type: types.ADD_MOVIE_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, movieSchema);
          return entities;
        },
        meta: { actionType: types.ADD, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.ADD_MOVIE_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const updateMovie = (movie) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${movie.id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
    types: [
      types.UPDATE_MOVIE_REQUEST,
      {
        type: types.UPDATE_MOVIE_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(movie, movieSchema);
          return entities;
        },
        meta: { actionType: types.UPDATE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.UPDATE_MOVIE_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const deleteMovie = (movie) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${movie.id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.DELETE_MOVIE_REQUEST,
      {
        type: types.DELETE_MOVIE_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(movie, movieSchema);
          return entities;
        },
        meta: { actionType: types.DELETE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.DELETE_MOVIE_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const assignDirectorToMovie = (movie) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: movie.director_id,
    }),
    types: [
      types.PATCH_DIRECTOR_REQUEST,
      {
        type: types.PATCH_DIRECTOR_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(movie, movieSchema);
          return entities;
        },
        meta: { actionType: types.UPDATE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.PATCH_DIRECTOR_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const deleteDirectorFromMovie = (movie) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${movie.id}/director`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.PATCH_DIRECTOR_REQUEST,
      {
        type: types.PATCH_DIRECTOR_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(
            { ...movie, director_id: null },
            movieSchema
          );
          return entities;
        },
        meta: { actionType: types.UPDATE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.PATCH_DIRECTOR_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};
