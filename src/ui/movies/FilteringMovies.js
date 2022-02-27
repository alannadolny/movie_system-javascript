import { connect } from 'react-redux';
import {
  getMoviesGenres,
  getMoviesReleaseYears,
} from '../../ducks/movies/selectors';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';

function FilteringMovies({
  genres,
  release_years,
  setActiveFilters,
  activeFilters,
}) {
  const { t } = useTranslation();
  const changeFilterByGenres = (event) => {
    if (activeFilters.genres.includes(event.target.value))
      setActiveFilters({
        ...activeFilters,
        genres: activeFilters.genres.filter(
          (genre) => genre !== event.target.value
        ),
      });
    else
      setActiveFilters({
        ...activeFilters,
        genres: [...activeFilters.genres, event.target.value],
      });
  };

  const changeFilterByYear = (event) => {
    setActiveFilters({
      ...activeFilters,
      year: event.target.value,
    });
  };

  const changeFilterByTitle = (event) => {
    setActiveFilters({
      ...activeFilters,
      title: event.target.value,
    });
  };

  return (
    <div id='filters'>
      <h3>{t('Filter by genres')}:</h3>
      <div>
        {genres.map((genre) => {
          return (
            <div key={genre} id='filter-checkbox'>
              <input
                onChange={changeFilterByGenres}
                value={genre}
                type='checkbox'
              />{' '}
              {genre}
            </div>
          );
        })}
      </div>
      <div>
        <h3>{t('Filter by release year')}:</h3>
        <select defaultValue={'0'} onChange={changeFilterByYear}>
          <option value='0'>{t('No filtering')}</option>
          {release_years.map((date) => {
            return (
              <option key={date} value={date}>
                {date}
              </option>
            );
          })}
        </select>
      </div>
      <h3>{t('Filter by title')}:</h3>
      <input
        type='text'
        onChange={changeFilterByTitle}
        placeholder={t('Enter a title')}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    genres: getMoviesGenres(state),
    release_years: getMoviesReleaseYears(state),
  };
};

export default connect(mapStateToProps, null)(FilteringMovies);
