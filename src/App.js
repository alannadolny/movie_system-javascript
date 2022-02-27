import './styles/css/style.css';
import PeopleList from './ui/people/PeopleList';
import PersonForm from './ui/people/PersonForm';
import { BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './ui/Dashboard';
import PersonDetails from './ui/people/PersonDetails';
import MoviesList from './ui/movies/MoviesList';
import MovieDetails from './ui/movies/MovieDetails';
import MovieForm from './ui/movies/MovieForm';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from './config/languages';
import LanguageButton from './ui/LanguageButton';
import Charts from './ui/charts/Charts';
import { useTranslation } from 'react-i18next';

i18next
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: languages || 'en',
    fallbackLng: 'en',
    ns: ['main'],
    defaultNS: 'main',
    react: {
      wait: true,
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });

function App({ errors }) {
  const { t } = useTranslation();

  return (
    <div className='App'>
      <LanguageButton />
      {!errors ? (
        <div id='main'>
          <BrowserRouter>
            <Dashboard />
            <Route exact path='/' component={Charts} />
            <Route exact path='/peopleList' component={PeopleList} />
            <Route exact path='/addPerson' component={PersonForm} />
            <Route exact path='/personDetail/:id' component={PersonDetails} />
            <Route exact path='/editPerson/:id' component={PersonForm} />
            <Route exact path='/moviesList' component={MoviesList} />
            <Route exact path='/movieDetails/:id' component={MovieDetails} />
            <Route exact path='/addMovie' component={MovieForm} />
            <Route exact path='/editMovie/:id' component={MovieForm} />
          </BrowserRouter>
        </div>
      ) : (
        <div id='database-connect'>{t('Cannot connect to database')}</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors.failure,
  };
};

export default connect(mapStateToProps, null)(App);
