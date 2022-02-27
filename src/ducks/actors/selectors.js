import * as _ from 'lodash';

export const getActorsFromMovie = (state, movieId) => {
  return state.entities.actors.allIds
    .map((id) => state.entities.actors.byId[id])
    .filter((actor) => actor.movie_id === parseInt(movieId));
};

export const getMoviesWithActor = (state, personId) => {
  return state.entities.actors.allIds
    .map((id) => state.entities.actors.byId[id])
    .filter((actor) => actor.person_id === parseInt(personId));
};

export const getActorsWithMoviesNumber = (state) => {
  return _.groupBy(
    state.entities.actors.allIds.map((id) => state.entities.actors.byId[id]),
    'person_id'
  );
};

export const getMoviesWithActorNumber = (state) => {
  return _.groupBy(
    state.entities.actors.allIds.map((id) => state.entities.actors.byId[id]),
    'movie_id'
  );
};
