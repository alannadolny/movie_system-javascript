import * as _ from 'lodash';

export const getAllMovies = (state) => {
  return state.entities.movies.allIds.map(
    (id) => state.entities.movies.byId[id]
  );
};

export const getMovieById = (state, id) => {
  return state.entities.movies.byId[id];
};

export const getMoviesDirectedBy = (state, id) => {
  return state.entities.movies.allIds
    .map((id) => state.entities.movies.byId[id])
    .filter((movie) => movie.director_id === parseInt(id));
};

export const getMoviesGenres = (state) => {
  return _.uniq(
    state.entities.movies.allIds.map(
      (id) => state.entities.movies.byId[id].genre
    )
  );
};

export const getMoviesReleaseYears = (state) => {
  return _.uniq(
    state.entities.movies.allIds
      .map((id) => state.entities.movies.byId[id].release_date)
      .map((date) =>
        new Date(new Date(date).toLocaleDateString('fr-CA')).getFullYear()
      )
  );
};

export const getDirectorByMovieId = (state, movieId) => {
  return !_.isEmpty(state.entities.people.byId) &&
    !_.isEmpty(state.entities.movies.byId)
    ? state.entities.people.byId[
        state.entities.movies.byId[parseInt(movieId)].director_id
      ]
    : {};
};

export const getYearsWithMoviesNumber = (state) => {
  return _.groupBy(
    state.entities.movies.allIds
      .map((id) => state.entities.movies.byId[id])
      .map((movie) => {
        return {
          ...movie,
          release_date: new Date(
            new Date(movie.release_date).toLocaleDateString('fr-CA')
          ).getFullYear(),
        };
      }),
    'release_date'
  );
};
