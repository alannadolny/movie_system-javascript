import { useTranslation } from 'react-i18next';

function ChangeChart({ setChartNumber, chartNumber }) {
  const { t } = useTranslation();

  return (
    <div id='buttons'>
      {t('Select chart')}: <br />
      <button
        id={chartNumber === 1 ? 'active-button' : 'inactive-button'}
        type='button'
        onClick={() => setChartNumber(1)}
      >
        {t('Actors with the most amount of movies')}
      </button>{' '}
      <br />
      <button
        id={chartNumber === 2 ? 'active-button' : 'inactive-button'}
        type='button'
        onClick={() => setChartNumber(2)}
      >
        {t('Movies with the most amount of actors')}
      </button>{' '}
      <br />
      <button
        id={chartNumber === 3 ? 'active-button' : 'inactive-button'}
        type='button'
        onClick={() => setChartNumber(3)}
      >
        {t('Years with the most amount of released movies')}
      </button>
    </div>
  );
}

export default ChangeChart;
