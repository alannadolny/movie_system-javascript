import types from '../people/types';
import * as _ from 'lodash';
const allEntities = ['people', 'movies', 'actors'];

const defaultState = allEntities.reduce(
  (acc, entity) => ({
    ...acc,
    [entity]: {
      byId: {},
      allIds: [],
    },
  }),
  {}
);

const entityReducer = (entity, state = { allIds: [], byId: {} }, action) => {
  const actionEntities = action.payload[entity];
  const { actionType } = action.meta;

  switch (actionType) {
    case types.GET_ALL:
      return {
        byId: {
          ...Object.keys(actionEntities).reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                ...state.byId[id],
                ...actionEntities[id],
              },
            }),
            {}
          ),
        },
        allIds: Object.keys(actionEntities),
      };
    case types.ADD:
      return {
        byId: {
          ...state.byId,
          ...Object.keys(actionEntities).reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                ...state.byId[id],
                ...actionEntities[id],
              },
            }),
            {}
          ),
        },
        allIds: [...state.allIds, ...Object.keys(actionEntities)],
      };
    case types.DELETE:
      return {
        byId: _.omit(state.byId, actionEntities),
        allIds: state.allIds.filter(
          (id) => !Object.keys(actionEntities).includes(id)
        ),
      };
    case types.UPDATE:
      return {
        byId: {
          ...state.byId,
          ...Object.keys(actionEntities).reduce(
            (acc, id) => ({
              ...acc,
              [id]: {
                ...state.byId[id],
                ...actionEntities[id],
              },
            }),
            {}
          ),
        },
        allIds: state.allIds,
      };
    default:
      return state;
  }
};

export const entities = (state = defaultState, action) => {
  if (!action.meta || !action.meta.actionType) return state;

  return {
    ...state,
    ...Object.keys(action.payload).reduce(
      (acc, entity) => ({
        ...acc,
        [entity]: entityReducer(entity, state[entity], action),
      }),
      {}
    ),
  };
};
