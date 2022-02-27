import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function MoviePresentation({ movie, director }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div>
      <div className='movie-details'>
        <img src={movie.image_url} alt='invalid url' />
        <div className='movie-description'>
          <span>
            <strong>{t('title')}: </strong> {movie && movie.title}
          </span>
          <span>
            <strong>{t('release date')}: </strong>
            {movie && new Date(movie.release_date).toLocaleDateString('fr-CA')}
          </span>
          <span>
            <strong>{t('genre')}: </strong>
            {movie && movie.genre}
          </span>
          <span>
            <strong>{t('description')}: </strong>
            {movie && movie.description}
          </span>
          <span>
            <strong>{t('director')}: </strong>
            {movie &&
              (movie.director_id ? (
                <u
                  onClick={() =>
                    history.push(`/personDetail/${movie.director_id}`)
                  }
                >
                  {director.first_name} {director.last_name}
                </u>
              ) : (
                t('Director is not assigned')
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MoviePresentation;
