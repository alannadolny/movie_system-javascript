import { useTranslation } from 'react-i18next';

function SortingMovies({ setSort, sort }) {
  const { t } = useTranslation();

  const changeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <div id='sort'>
      <h3>{t('Sort by')}:</h3>
      <select defaultValue={sort} onChange={changeSort}>
        <option value='id'>Id</option>
        <option value='title'>{t('Title')}</option>
        <option value='release_date'>{t('Release date')}</option>
      </select>
    </div>
  );
}

export default SortingMovies;
