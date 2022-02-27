import { Formik, Form, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { getPeopleList } from '../../ducks/people/operations';
import { getAllPeople } from '../../ducks/people/selectors';
import { assignDirectorToMovie } from '../../ducks/movies/operations';
import * as yup from 'yup';
import * as _ from 'lodash';
import { useTranslation } from 'react-i18next';

function ChangeDirector({
  movie,
  people,
  getPeopleList,
  assignDirectorToMovie,
}) {
  const { t } = useTranslation();

  const schema = yup.object().shape({
    director_id: yup.string().required(t('Director is required')),
  });

  return (
    <div>
      <strong>{t('change director')}: </strong>
      <Formik
        validationSchema={schema}
        initialValues={{
          director_id: '',
          movie_id: movie && movie.id,
        }}
        enableReinitialize={true}
        onSubmit={(value) => {
          assignDirectorToMovie({
            ...movie,
            director_id: parseInt(value.director_id),
          });
        }}
      >
        <Form>
          <ErrorMessage name='director_id' component='div' />
          <Field as='select' name='director_id'>
            <option value='' label={t('Select a director')} />
            {people.map((person) => (
              <option
                key={person.id}
                value={person.id}
                label={`${person.first_name} ${person.last_name}`}
              />
            ))}
          </Field>
          <button type='submit'> {t('change director')} </button>
        </Form>
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    people: getAllPeople(state),
  };
};

const mapDispatchToProps = {
  getPeopleList,
  assignDirectorToMovie,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeDirector);
