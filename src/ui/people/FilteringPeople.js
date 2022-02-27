import { connect } from 'react-redux';
import * as _ from 'lodash';
import {
  getPeopleBirthYears,
  getPeopleNationality,
} from '../../ducks/people/selectors';
import { useTranslation } from 'react-i18next';

function FilteringPeople({
  nationalities,
  birth_years,
  setActiveFilters,
  activeFilters,
}) {
  const { t } = useTranslation();

  const changeFilterByNationality = (event) => {
    if (activeFilters.nationalities.includes(event.target.value))
      setActiveFilters({
        ...activeFilters,
        nationalities: activeFilters.nationalities.filter(
          (nationality) => nationality !== event.target.value
        ),
      });
    else
      setActiveFilters({
        ...activeFilters,
        nationalities: [...activeFilters.nationalities, event.target.value],
      });
  };

  const changeFilterByYear = (event) => {
    setActiveFilters({
      ...activeFilters,
      year: event.target.value,
    });
  };

  const changeFilterByFullName = (event) => {
    setActiveFilters({
      ...activeFilters,
      full_name: event.target.value,
    });
  };

  return (
    <div id='filters'>
      <h3>{t('Filter by nationality')}:</h3>
      <div>
        {nationalities.map((nationality) => {
          return (
            <div key={nationality}>
              <input
                onChange={changeFilterByNationality}
                value={nationality}
                type='checkbox'
              />{' '}
              {nationality}
            </div>
          );
        })}
      </div>
      <div>
        <h3>{t('Filter by birth year')}:</h3>
        <select defaultValue={'0'} onChange={changeFilterByYear}>
          <option value='0'>{t('No filtering')}</option>
          {birth_years.map((date) => {
            return (
              <option key={date} value={date}>
                {date}
              </option>
            );
          })}
        </select>
      </div>
      <h3>{t('Filter by full name')}:</h3>
      <input
        type='text'
        onChange={changeFilterByFullName}
        placeholder={t('Enter a full name')}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    nationalities: getPeopleNationality(state),
    birth_years: getPeopleBirthYears(state),
  };
};

export default connect(mapStateToProps, null)(FilteringPeople);
