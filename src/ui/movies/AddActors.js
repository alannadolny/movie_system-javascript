import { connect } from 'react-redux';
import { getPeopleList } from '../../ducks/people/operations';
import * as _ from 'lodash';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
  addActor,
  deleteActor,
  getAllActors,
} from '../../ducks/actors/operations';
import { useHistory, withRouter } from 'react-router-dom';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

function AddActors({
  people,
  actors,
  movie,
  addActor,
  deleteActor,
  getAllActors,
}) {
  const { t } = useTranslation();

  useEffect(() => {
    if (_.isEmpty(actors)) movie && getAllActors();
  }, [movie]);

  const actorsToPeople = (actors, people) => {
    return actors.map((actor) => {
      return people.find((person) => person.id === actor.person_id);
    });
  };

  const history = useHistory();

  const schema = yup.object().shape({
    actor_id: yup.string().required(t('Actor is required')),
  });

  return (
    <div>
      <strong>{t('add actor')}: </strong>
      <br />
      <Formik
        validationSchema={schema}
        initialValues={{
          movie_id: movie && movie.id,
          actor_id: '',
        }}
        enableReinitialize={true}
        onSubmit={(value, { resetForm }) => {
          addActor(value.movie_id, parseInt(value.actor_id));
          resetForm({});
        }}
      >
        <Form>
          <ErrorMessage name='actor_id' component='div' />
          <Field as='select' name='actor_id'>
            <option value='' label={t('Select an actor')} />
            {people &&
              _.difference(people, actorsToPeople(actors, people)).map(
                (person) => (
                  <option
                    key={person.id}
                    value={person.id}
                    label={`${person.first_name} ${person.last_name}`}
                  />
                )
              )}
          </Field>
          <button type='submit'> {t('add actor')} </button>
        </Form>
      </Formik>
      <strong>{t('Actors list')}:</strong> <br />
      {!_.isEmpty(actors)
        ? actors.map((actor) => {
            const actorInfo = people.find((el) => el.id === actor.person_id);
            return (
              <div key={actor.id}>
                <div
                  key={actor.id}
                  onClick={() =>
                    history.push(`/personDetail/${actor.person_id}`)
                  }
                >
                  <u>
                    {actorInfo.first_name} {actorInfo.last_name}
                  </u>
                </div>
                <button
                  onClick={() => {
                    deleteActor(actor);
                  }}
                >
                  {t('delete actor')}
                </button>
              </div>
            );
          })
        : t('There are no actors')}{' '}
      <br />
    </div>
  );
}

const mapDispatchToProps = {
  getPeopleList,
  getAllActors,
  addActor,
  deleteActor,
};

export default withRouter(connect(null, mapDispatchToProps)(AddActors));
