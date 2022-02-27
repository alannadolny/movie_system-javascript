import * as _ from 'lodash';

export const getAllPeople = (state) => {
  return state.entities.people.allIds.map(
    (id) => state.entities.people.byId[id]
  );
};

export const getPersonById = (state, id) => {
  return state.entities.people.byId[id];
};

export const getPeopleNationality = (state) => {
  return _.uniq(
    state.entities.people.allIds
      .map((id) => state.entities.people.byId[id])
      .map((person) => person.nationality)
  );
};

export const getPeopleBirthYears = (state) => {
  return _.uniq(
    state.entities.people.allIds
      .map((id) => state.entities.people.byId[id].birth_date)
      .map((date) =>
        new Date(new Date(date).toLocaleDateString('fr-CA')).getFullYear()
      )
  );
};
