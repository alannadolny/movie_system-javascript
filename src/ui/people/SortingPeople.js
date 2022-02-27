import { useTranslation } from 'react-i18next';

function SortingPeople({ setSort, sort }) {
  const changeSort = (event) => {
    setSort(event.target.value);
  };

  const { t } = useTranslation();

  return (
    <div id='sort'>
      <h3>{t('Sort by')}:</h3>
      <select defaultValue={sort} onChange={changeSort}>
        <option value='id'>Id</option>
        <option value='first_name'>{t('First name')}</option>
        <option value='last_name'>{t('Last name')}</option>
        <option value='birth_date'>{t('Birth date')}</option>
      </select>
    </div>
  );
}

export default SortingPeople;
