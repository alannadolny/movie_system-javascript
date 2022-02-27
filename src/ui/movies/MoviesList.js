import { connect } from 'react-redux';
import { getAllMovies } from '../../ducks/movies/selectors';
import { getMoviesList } from '../../ducks/movies/operations';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { getAllPeople } from '../../ducks/people/selectors';
import { getPeopleList } from '../../ducks/people/operations';
import SortingMovies from './SortingMovies';
import FilteringMovies from './FilteringMovies';
import { useTranslation } from 'react-i18next';
import MoviesPaginate from './MoviesPaginate';

function MoviesList({ movies, getMoviesList, people, getPeopleList }) {
  const { t } = useTranslation();

  const [sort, setSort] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState({
    genres: [],
    year: '0',
    title: '',
  });
  useEffect(() => {
    if (_.isEmpty(movies)) getMoviesList();
  }, []);

  useEffect(() => {
    if (_.isEmpty(people)) getPeopleList();
  }, []);

  const filteredMovies = () => {
    return _.sortBy(
      movies
        .filter((movie) => {
          if (_.isEmpty(activeFilters.genres)) return true;
          else {
            if (activeFilters.genres.includes(movie.genre)) return true;
            else return false;
          }
        })
        .filter((movie) => {
          if (activeFilters.year === '0') return true;
          else {
            if (
              new Date(new Date(movie.release_date).toLocaleDateString('fr-CA'))
                .getFullYear()
                .toString() === activeFilters.year
            )
              return true;
            else return false;
          }
        })
        .filter((movie) => {
          if (!activeFilters.title) return true;
          else {
            if (new RegExp(`.*${activeFilters.title}.*`).test(movie.title))
              return true;
            else return false;
          }
        }),
      [sort]
    );
  };

  const history = useHistory();

  return (
    <div id='list'>
      <div id='tools'>
        {' '}
        <h1>{t('Movies list')}</h1>
        <SortingMovies setSort={setSort} sort={sort} />
        <FilteringMovies
          setActiveFilters={setActiveFilters}
          activeFilters={activeFilters}
        />
        <button onClick={() => history.push('/addMovie')}>
          {t('Add movie')}
        </button>
        <MoviesPaginate
          movies={filteredMovies()}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
      <div id='movies-list-main'>
        {filteredMovies()
          .slice((currentPage - 1) * 4, currentPage * 4)
          .map((movie) => {
            return (
              <div
                className='movie-container'
                key={movie.id}
                onClick={() => {
                  history.push(`/movieDetails/${movie.id}`);
                }}
              >
                <img src={movie.image_url} alt='invalid url' />
                <div className='movie-container-shortinfo'>
                  <span>
                    <strong>{t('Title')}:</strong> {movie.title}
                  </span>
                  <span>
                    <strong>{t('Genre')}:</strong> {movie.genre}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: getAllMovies(state),
    people: getAllPeople(state),
  };
};

const mapDispatchToProps = {
  getMoviesList,
  getPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
