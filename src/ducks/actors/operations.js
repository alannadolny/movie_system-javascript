import { createAction } from 'redux-api-middleware';
import { schema, normalize } from 'normalizr';
import types from './types';
import errorType from '../errors/types';

const actorSchema = new schema.Entity('actors');
const actorsSchema = new schema.Array(actorSchema);

export const getAllActors = () => {
  return createAction({
    endpoint: `http://localhost:5000/api/actors`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.ACTORS_LIST_REQUEST,
      {
        type: types.ACTORS_LIST_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, actorsSchema);
          return entities;
        },
        meta: { actionType: types.GET_ALL, errorType: errorType.WITHOUT_ERROR },
      },
      {
        type: types.ACTORS_LIST_FAILURE,
        meta: { errorType: errorType.WITH_ERROR },
      },
    ],
  });
};

export const addActor = (movie_id, person_id) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${movie_id}/actors`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: person_id,
    }),
    types: [
      types.ADD_ACTOR_REQUEST,
      {
        type: types.ADD_ACTOR_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, actorSchema);
          return entities;
        },
        meta: { actionType: types.ADD, errorType: errorType.WITHOUT_ERROR },
      },
      {
        type: types.ADD_ACTOR_FAILURE,
        meta: { errorType: errorType.WITH_ERROR },
      },
    ],
  });
};

export const deleteActor = (actor) => {
  return createAction({
    endpoint: `http://localhost:5000/api/movies/${actor.movie_id}/actors/${actor.person_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.DELETE_ACTOR_REQUEST,
      {
        type: types.DELETE_ACTOR_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(actor, actorSchema);
          return entities;
        },
        meta: { actionType: types.DELETE, errorType: errorType.WITHOUT_ERROR },
      },
      {
        type: types.DELETE_ACTOR_FAILURE,
        meta: { errorType: errorType.WITH_ERROR },
      },
    ],
  });
};
