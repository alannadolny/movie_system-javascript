import { useTranslation } from 'react-i18next';

function PersonPresentation({ person }) {
  const { t } = useTranslation();

  return (
    <div id='person-info'>
      <h1>{t('Details')}</h1>
      <div>
        <strong>{t('First name')}: </strong> {person && person.first_name}
      </div>
      <div>
        <strong>{t('Last name')}: </strong>
        {person && person.last_name}
      </div>
      <div>
        <strong>{t('Birth date')}: </strong>
        {person && new Date(person.birth_date).toLocaleDateString('fr-CA')}
      </div>
      <div>
        <strong>{t('Nationality')}: </strong>
        {person && person.nationality}
      </div>
    </div>
  );
}

export default PersonPresentation;
