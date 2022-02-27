import { Form, Formik, Field, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  addPerson,
  updatePerson,
  getPeopleList,
} from '../../ducks/people/operations';
import { getPersonById } from '../../ducks/people/selectors';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function PersonForm({ addPerson, updatePerson, person, getPeopleList }) {
  const [addOrEdit, setAddOrEdit] = useState('Add person');
  const { t } = useTranslation();
  const { id } = useParams();

  useEffect(() => {
    if (!person && id) getPeopleList();
  }, []);

  useEffect(() => {
    person ? setAddOrEdit('Edit person') : setAddOrEdit('Add person');
  }, [person]);

  const setInitialValues = (person) => {
    if (person) {
      return {
        first_name: person.first_name,
        last_name: person.last_name,
        birth_date: new Date(person.birth_date)
          .toLocaleDateString('fr-CA')
          .split('T')[0],
        nationality: person.nationality,
      };
    } else {
      return {
        first_name: '',
        last_name: '',
        birth_date: '',
        nationality: '',
      };
    }
  };

  const setSubmit = (person, values, errors) => {
    if (person) {
      updatePerson({ ...values, id: person.id });
    } else {
      addPerson(values);
    }
    history.goBack();
  };

  const schema = yup.object().shape({
    first_name: yup
      .string(t('First name should be a string'))
      .required(t('First name is required'))
      .matches(/^[a-zA-Z]+$/, t('First name cannot contain numbers'))
      .max(60, t('First name should be shorter than 60 letters')),
    last_name: yup
      .string(t('Last name should be a string'))
      .required(t('Last name is required'))
      .matches(/^[a-zA-Z]+$/, t('Last name cannot contains number'))
      .max(60, t('Last name should be shorter than 60 letters')),
    birth_date: yup
      .string(t('Birth date should be a string'))
      .matches(
        /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
        t('Date format should be YYYY-MM-DD')
      )
      .required(t('Birth date is required')),
    nationality: yup
      .string(t('Nationality should be a string'))
      .matches(/^[a-zA-Z]+$/, t('Nationality cannot contains number'))
      .required(t('Nationality is required'))
      .max(60, t('Nationality should be shorter than 60 letters')),
  });

  const history = useHistory();

  return (
    <div id='forms'>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          setSubmit(person, values);
        }}
        enableReinitialize={true}
        initialValues={setInitialValues(person)}
      >
        <Form>
          <div id='errors'>
            <ErrorMessage name='first_name' component='div' />
            <ErrorMessage name='last_name' component='div' />
            <ErrorMessage name='birth_date' component='div' />
            <ErrorMessage name='nationality' component='div' />
          </div>
          <strong>{t('First name')}: </strong>
          <Field name='first_name' />
          <strong>{t('Last name')}: </strong>
          <Field name='last_name' />
          <strong>{t('Birth date')}: </strong>
          <Field name='birth_date' />
          <strong>{t('Nationality')}: </strong>
          <Field name='nationality' />
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
    person: getPersonById(state, ownProps.match.params.id),
  };
};

const mapDispatchToProps = {
  addPerson,
  updatePerson,
  getPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonForm);
