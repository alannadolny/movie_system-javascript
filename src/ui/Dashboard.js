import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  return (
    <div id='dashboard'>
      <Link to='/peopleList'> {t('People list')} </Link> <br />
      <Link to='/'>{t('Statistics')} </Link> <br />
      <Link to='/moviesList'> {t('Movies list')} </Link>
    </div>
  );
}

export default Dashboard;
