import types from './types';

export const errorsReducer = (state = { failure: false }, action) => {
  if (!action.meta || !action.meta.errorType) return state;

  const { errorType } = action.meta;

  switch (errorType) {
    case types.WITH_ERROR:
      return {
        failure: true,
      };
    case types.WITHOUT_ERROR:
      return {
        failure: false,
      };
    default:
      return state;
  }
};
