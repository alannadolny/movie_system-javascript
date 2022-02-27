import { Pie as PieJS } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {
  getActorsWithMoviesNumber,
  getMoviesWithActorNumber,
} from '../../ducks/actors/selectors';
import { getMoviesList } from '../../ducks/movies/operations';
import { getAllActors } from '../../ducks/actors/operations';
import * as _ from 'lodash';
import { getPeopleList } from '../../ducks/people/operations';
import { getAllPeople } from '../../ducks/people/selectors';
import { useEffect } from 'react';
import ChangeChart from './ChangeChart';
import { useState } from 'react';
import {
  getAllMovies,
  getYearsWithMoviesNumber,
} from '../../ducks/movies/selectors';
import { useTranslation } from 'react-i18next';

function Charts({
  getAllActors,
  actorsWithMoviesNumber,
  moviesWithActorNumber,
  people,
  getPeopleList,
  movies,
  getMoviesList,
  yearsWithMoviesNumber,
}) {
  useEffect(() => {
    if (_.isEmpty(actorsWithMoviesNumber)) getAllActors();
    if (_.isEmpty(people)) getPeopleList();
    if (_.isEmpty(moviesWithActorNumber)) getMoviesList();
  }, []);

  const { t } = useTranslation();
  const [chartNumber, setChartNumber] = useState(1);

  return (
    <div>
      {!_.isEmpty(actorsWithMoviesNumber) &&
      !_.isEmpty(people) &&
      !_.isEmpty(moviesWithActorNumber) ? (
        <div id='charts'>
          <ChangeChart
            setChartNumber={setChartNumber}
            chartNumber={chartNumber}
          />
          <div id='chart'>
            {' '}
            {!_.isEmpty(actorsWithMoviesNumber) &&
              !_.isEmpty(people) &&
              !_.isEmpty(moviesWithActorNumber) && (
                <Pie
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text:
                          chartNumber === 1
                            ? t('Actors with the most amount of movies')
                            : chartNumber === 2
                            ? t('Movies with the most amount of actors')
                            : t(
                                'Years with the most amount of released movies'
                              ),
                        color: 'white',
                        font: {
                          size: 20,
                        },
                      },
                      legend: {
                        position: 'bottom',
                        labels: {
                          font: {
                            size: 14,
                          },
                          color: 'white',
                        },
                      },
                    },
                  }}
                  data={{
                    labels:
                      chartNumber === 1
                        ? Object.keys(actorsWithMoviesNumber).map((el) => {
                            return `${
                              people.find(
                                (person) => parseInt(person.id) === parseInt(el)
                              ).first_name
                            } ${
                              people.find(
                                (person) => parseInt(person.id) === parseInt(el)
                              ).last_name
                            }`;
                          })
                        : chartNumber === 2
                        ? Object.keys(moviesWithActorNumber).map((el) => {
                            return `${
                              movies.find(
                                (movie) => parseInt(el) === parseInt(movie.id)
                              ).title
                            }`;
                          })
                        : Object.keys(yearsWithMoviesNumber),
                    datasets: [
                      {
                        data:
                          chartNumber === 1
                            ? Object.keys(actorsWithMoviesNumber).map(
                                (el) => actorsWithMoviesNumber[el].length
                              )
                            : chartNumber === 2
                            ? Object.keys(moviesWithActorNumber).map(
                                (el) => moviesWithActorNumber[el].length
                              )
                            : Object.keys(yearsWithMoviesNumber).map(
                                (el) => yearsWithMoviesNumber[el].length
                              ),
                        backgroundColor: Array.from(
                          {
                            length: Object.keys(
                              chartNumber === 1
                                ? actorsWithMoviesNumber
                                : chartNumber === 2
                                ? moviesWithActorNumber
                                : yearsWithMoviesNumber
                            ).length,
                          },
                          (_, i) => i + 1
                        ).map(
                          (el) =>
                            `rgb(${_.random(0, 255)}, ${_.random(
                              0,
                              255
                            )}, ${_.random(0, 255)})`
                        ),
                        borderColor: 'white',
                        borderWidth: 5,
                      },
                    ],
                  }}
                />
              )}
          </div>
        </div>
      ) : (
        <h3 id='empty-db'>
          {t('To get statistics you need at least one movie, actor and person')}
        </h3>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    movies: getAllMovies(state),
    people: getAllPeople(state),
    actorsWithMoviesNumber: getActorsWithMoviesNumber(state),
    moviesWithActorNumber: getMoviesWithActorNumber(state),
    yearsWithMoviesNumber: getYearsWithMoviesNumber(state),
  };
};
const mapDispatchToProps = {
  getMoviesList,
  getAllActors,
  getPeopleList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
