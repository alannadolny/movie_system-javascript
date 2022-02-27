import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getDirectorByMovieId,
  getMovieById,
} from '../../ducks/movies/selectors';
import { useEffect } from 'react';
import { getMoviesList, deleteMovie } from '../../ducks/movies/operations';
import ChangeDirector from './ChangeDirector';
import AddActors from './AddActors';
import { getPersonById } from '../../ducks/people/selectors';
import { getPeopleList } from '../../ducks/people/operations';
import { getAllPeople } from '../../ducks/people/selectors';
import { getActorsFromMovie } from '../../ducks/actors/selectors';
import { deleteActor } from '../../ducks/actors/operations';
import * as _ from 'lodash';
import MoviePresentation from './MoviePresentation';
import { useTranslation } from 'react-i18next';

function MovieDetails({
  movie,
  getMoviesList,
  deleteMovie,
  director,
  people,
  getPeopleList,
  actors,
  deleteActor,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  useEffect(() => {
    if (!movie) getMoviesList();
  }, []);

  useEffect(() => {
    if (_.isEmpty(people)) getPeopleList();
  }, []);

  return (
    <div id='movie-info'>
      {movie && <MoviePresentation movie={movie} director={director} />}
      <div id='movie-right-bar'>
        <button onClick={() => history.goBack()}> {t('undo')} </button>
        <button onClick={() => history.push(`/editMovie/${movie.id}`)}>
          {t('edit')}
        </button>
        <button
          onClick={async () => {
            // eslint-disable-next-line no-restricted-globals
            if (confirm('Are you sure to delete this movie?')) {
              history.goBack();
              for (const actor of actors) {
                await deleteActor(actor);
              }
              deleteMovie(movie);
            } else {
              alert('Deletion cancelled');
            }
          }}
        >
          {t('delete')}
        </button>
        <ChangeDirector movie={movie} />
        <AddActors movie={movie} actors={actors} people={people} />
      </div>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    actors: getActorsFromMovie(state, ownProps.match.params.id),
    people: getAllPeople(state),
    movie: getMovieById(state, ownProps.match.params.id),
    director: getDirectorByMovieId(state, ownProps.match.params.id),
  };
};

const mapDispatchToProps = {
  getPeopleList,
  getMoviesList,
  deleteMovie,
  deleteActor,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
