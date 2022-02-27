import { connect } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { getMoviesWithActor } from '../../ducks/actors/selectors';
import { getMoviesDirectedBy } from '../../ducks/movies/selectors';
import { useEffect } from 'react';
import * as _ from 'lodash';
import { getAllActors } from '../../ducks/actors/operations';
import { useTranslation } from 'react-i18next';

function PlayedIn({ directedBy, getAllActors, playedIn, movies }) {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    if (_.isEmpty(playedIn)) getAllActors();
  }, []);

  return (
    <div>
      <h3>{t('Directed movies')}:</h3>
      <div>
        {!_.isEmpty(directedBy)
          ? directedBy.map((movie) => {
              return (
                <div
                  key={movie.id}
                  onClick={() => history.push(`/movieDetails/${movie.id}`)}
                >
                  <strong>{t('Title')}: </strong>
                  <u>{movie.title}</u>
                </div>
              );
            })
          : t('There are no films')}
      </div>
      <h3>{t('Played in')}:</h3>
      {!_.isEmpty(playedIn)
        ? playedIn.map((actor) => {
            const movie = movies.find((el) => el.id === actor.movie_id);
            return (
              movie && (
                <div
                  key={actor.id}
                  onClick={() =>
                    history.push(`/movieDetails/${actor.movie_id}`)
                  }
                >
                  <strong>{t('Title')}: </strong>
                  <u>{movie.title}</u>
                </div>
              )
            );
          })
        : t('There are no films')}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  directedBy: getMoviesDirectedBy(state, ownProps.match.params.id),
  playedIn: getMoviesWithActor(state, ownProps.match.params.id),
});

const mapDispatchToProps = {
  getAllActors,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlayedIn)
);
