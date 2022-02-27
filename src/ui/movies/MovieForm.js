import { Form, Formik, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  addMovie,
  updateMovie,
  getMoviesList,
} from '../../ducks/movies/operations';
import { getAllMovies, getMovieById } from '../../ducks/movies/selectors';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as _ from 'lodash';

function MovieForm({ addMovie, updateMovie, movie, getMoviesList, movies }) {
  const [addOrEdit, setAddOrEdit] = useState('Add movie');

  const { id } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (!movie && id) getMoviesList();
    if (_.isEmpty(movies)) getMoviesList();
  }, []);

  useEffect(() => {
    movie ? setAddOrEdit('Edit movie') : setAddOrEdit('Add movie');
  }, [movie]);

  const setInitialValues = (movie) => {
    if (movie) {
      return {
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        image_url: movie.image_url ? movie.image_url : '',
        release_date: new Date(movie.release_date)
          .toLocaleDateString('fr-CA')
          .split('T')[0],
      };
    } else {
      return {
        title: '',
        description: '',
        genre: '',
        image_url: '',
        release_date: '',
      };
    }
  };

  const setSubmit = (movie, values) => {
    if (movie) {
      updateMovie({ ...values, id: movie.id });
    } else {
      addMovie(values);
    }
    history.goBack();
  };

  yup.addMethod(yup.mixed, 'isTitleDuplicated', function (err) {
    return this.test('isTitleDuplicated', function (v) {
      const titles = Object.keys(movies).map((el) => movies[el].title);
      const { path, createError } = this;
      if (titles.includes(v)) return createError({ path, message: err });
      return true;
    });
  });

  const schema = yup.object().shape({
    title: yup
      .string(t('Title should be a string'))
      .required(t('Title is required'))
      .isTitleDuplicated(t('Title is duplicated')),
    description: yup
      .string(t('Description should be a string'))
      .required(t('Description is required')),
    genre: yup
      .string(t('Genre should be a string'))
      .required(t('Genre is required'))
      .max(50, t('Genre should be shorther than 50 letters')),
    image_url: yup
      .string(t('Image url should be a string'))
      .url(t('Image url should be a valid address')),
    release_date: yup
      .string(t('Release date should be a string'))
      .required(t('Release date is required'))
      .matches(
        /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
        t('Date format should be YYYY-MM-DD')
      ),
  });

  const schemaForEdit = yup.object().shape({
    title: yup
      .string(t('Title should be a string'))
      .required(t('Title is required')),
    description: yup
      .string(t('Description should be a string'))
      .required(t('Description is required')),
    genre: yup
      .string(t('Genre should be a string'))
      .required(t('Genre is required'))
      .max(50, t('Genre should be shorther than 50 letters')),
    image_url: yup
      .string(t('Image url should be a string'))
      .url(t('Image url should be a valid address')),
    release_date: yup
      .string(t('Release date should be a string'))
      .required(t('Release date is required')),
  });

  const history = useHistory();

  return (
    <div id='forms'>
      <Formik
        validationSchema={movie ? schemaForEdit : schema}
        onSubmit={(values) => {
          setSubmit(movie, values);
        }}
        enableReinitialize={true}
        initialValues={setInitialValues(movie)}
      >
        <Form>
          <div id='errors'>
            <ErrorMessage name='title' component='div' />
            <ErrorMessage name='description' component='div' />
            <ErrorMessage name='genre' component='div' />
            <ErrorMessage name='image_url' component='div' />
            <ErrorMessage name='release_date' component='div' />
          </div>
          <strong>{t('Title')}: </strong>
          <Field name='title' />
          <strong>{t('Description')}: </strong>
          <Field name='description' />
          <strong>{t('Genre')}: </strong>
          <Field name='genre' />
          <strong>{t('Image url')}: </strong>
          <Field name='image_url' />
          <strong>{t('Release date')}: </strong>
          <Field name='release_date' />
          <button type='submit'>{t(addOrEdit)}</button>
          <button type='button' onClick={() => history.goBack()}>
            {t('undo')}
          </button>
        </Form>
      </Formik>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    movie: getMovieById(state, ownProps.match.params.id),
    movies: getAllMovies(state),
  };
};

const mapDispatchToProps = {
  addMovie,
  updateMovie,
  getMoviesList,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieForm);
