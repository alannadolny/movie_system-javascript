import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { getPeopleList } from '../../ducks/people/operations';
import { getAllPeople } from '../../ducks/people/selectors';
import * as _ from 'lodash';
import SortingPeople from './SortingPeople';
import FilteringPeople from './FilteringPeople';
import { useTranslation } from 'react-i18next';
import PeoplePaginate from './PeoplePaginate';

const PeopleList = ({ people, getPeopleList }) => {
  useEffect(() => {
    if (_.isEmpty(people)) getPeopleList();
  }, []);
  const { t } = useTranslation();
  const [sort, setSort] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const [activeFilters, setActiveFilters] = useState({
    nationalities: [],
    year: '0',
    full_name: '',
  });

  const filteredPeople = () => {
    return _.sortBy(people, [sort])
      .filter((person) => {
        if (_.isEmpty(activeFilters.nationalities)) return true;
        else {
          if (activeFilters.nationalities.includes(person.nationality))
            return true;
          else return false;
        }
      })
      .filter((person) => {
        if (activeFilters.year === '0') return true;
        else {
          if (
            new Date(new Date(person.birth_date).toLocaleDateString('fr-CA'))
              .getFullYear()
              .toString() === activeFilters.year
          )
            return true;
          else return false;
        }
      })
      .filter((person) => {
        if (!activeFilters.full_name) return true;
        else {
          if (
            new RegExp(`.*${activeFilters.full_name}.*`).test(
              `${person.first_name} ${person.last_name}`
            )
          )
            return true;
          else return false;
        }
      });
  };

  return (
    <div id='list'>
      <div id='tools'>
        <h1>{t('People list')}</h1>
        <SortingPeople sort={sort} setSort={setSort} />
        <FilteringPeople
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <button onClick={() => history.push('/addPerson')}>
          {' '}
          {t('Add person')}{' '}
        </button>
        <PeoplePaginate
          people={filteredPeople()}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div id='people-list-main'>
        {' '}
        {people &&
          filteredPeople()
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((person) => {
              return (
                <div
                  className='person-container'
                  key={person.id}
                  onClick={() => history.push(`/personDetail/${person.id}`)}
                >
                  <div>
                    <strong>{t('First name')}: </strong>
                    {person.first_name}
                  </div>
                  <div>
                    <strong>{t('Last name')}: </strong>
                    {person.last_name}
                  </div>
                  <div>
                    <strong>{t('Nationality')}: </strong>
                    {person.nationality}
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    people: getAllPeople(state),
  };
};
const mapDispatchToProps = {
  getPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList);
