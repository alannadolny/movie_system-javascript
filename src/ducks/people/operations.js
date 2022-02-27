import { createAction } from 'redux-api-middleware';
import { schema, normalize } from 'normalizr';
import types from './types';
import errorTypes from '../errors/types';

const personSchema = new schema.Entity('people');
const peopleSchema = new schema.Array(personSchema);

export const getPeopleList = () => {
  return createAction({
    endpoint: 'http://localhost:5000/api/persons',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.PEOPLE_LIST_REQUEST,
      {
        type: types.PEOPLE_LIST_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, peopleSchema);
          return entities;
        },
        meta: {
          actionType: types.GET_ALL,
          errorType: errorTypes.WITHOUT_ERROR,
        },
      },
      {
        type: types.PEOPLE_LIST_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const addPerson = (person) => {
  return createAction({
    endpoint: `http://localhost:5000/api/persons`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
    types: [
      types.ADD_PERSON_REQUEST,
      {
        type: types.ADD_PERSON_SUCCESS,
        payload: async (action, state, res) => {
          const json = await res.json();
          const { entities } = normalize(json, personSchema);
          return entities;
        },
        meta: { actionType: types.ADD, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.ADD_PERSON_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const deletePerson = (person) => {
  return createAction({
    endpoint: `http://localhost:5000/api/persons/${person.id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    types: [
      types.DELETE_PERSON_REQUEST,
      {
        type: types.DELETE_PERSON_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(person, personSchema);
          return entities;
        },
        meta: { actionType: types.DELETE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.DELETE_PERSON_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};

export const updatePerson = (person) => {
  return createAction({
    endpoint: `http://localhost:5000/api/persons/${person.id}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
    types: [
      types.UPDATE_PERSON_REQUEST,
      {
        type: types.UPDATE_PERSON_SUCCESS,
        payload: async (action, state, res) => {
          const { entities } = normalize(person, personSchema);
          return entities;
        },
        meta: { actionType: types.UPDATE, errorType: errorTypes.WITHOUT_ERROR },
      },
      {
        type: types.UPDATE_PERSON_FAILURE,
        meta: { errorType: errorTypes.WITH_ERROR },
      },
    ],
  });
};
