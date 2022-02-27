import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPersonById } from '../../ducks/people/selectors';
import { deletePerson, getPeopleList } from '../../ducks/people/operations';
import { useEffect } from 'react';
import PlayedIn from './PlayedIn';
import { getAllMovies } from '../../ducks/movies/selectors';
import { getMoviesList } from '../../ducks/movies/operations';
import * as _ from 'lodash';
import { getMoviesWithActor } from '../../ducks/actors/selectors';
import { deleteActor } from '../../ducks/actors/operations';
import { getMoviesDirectedBy } from '../../ducks/movies/selectors';
import { deleteDirectorFromMovie } from '../../ducks/movies/operations';
import PersonPresentation from './PersonPresentation';
import { useTranslation } from 'react-i18next';

function PersonDetails({
  person,
  deletePerson,
  getPeopleList,
  movies,
  getMoviesList,
  playedIn,
  deleteActor,
  directedBy,
  deleteDirectorFromMovie,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (!person) getPeopleList();
  }, []);

  useEffect(() => {
    if (_.isEmpty(movies)) getMoviesList();
  }, []);

  const history = useHistory();

  return (
    <div id='person-detail'>
      <div>
        <PersonPresentation person={person} />
        <div id='person-right-bar'>
          <button onClick={() => history.goBack()}>{t('Undo')}</button>
          <button
            onClick={async () => {
              // eslint-disable-next-line no-restricted-globals
              if (confirm(t('Are you sure to delete this person?'))) {
                history.goBack();
                for (const actor of playedIn) {
                  await deleteActor(actor);
                }
                for (const movie of directedBy) {
                  await deleteDirectorFromMovie(movie);
                }
                deletePerson(person);
              } else {
                alert(t('Deletion cancelled'));
              }
            }}
          >
            {t('Delete')}
          </button>
          <button
            onClick={() => {
              history.push(`/editPerson/${person.id}`);
            }}
          >
            {t('Edit')}
          </button>
          <PlayedIn movies={movies} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    movies: getAllMovies(state),
    person: getPersonById(state, ownProps.match.params.id),
    playedIn: getMoviesWithActor(state, ownProps.match.params.id),
    directedBy: getMoviesDirectedBy(state, ownProps.match.params.id),
  };
};

const mapDispatchToProps = {
  deletePerson,
  getPeopleList,
  getMoviesList,
  deleteActor,
  deleteDirectorFromMovie,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
