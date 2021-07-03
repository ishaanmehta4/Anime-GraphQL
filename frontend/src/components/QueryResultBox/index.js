import React, { useState, useEffect } from 'react';
import './index.scss';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import JSONPretty from 'react-json-pretty';
import './react-json-pretty-custom.css';

import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
const API_BASE_URL = 'https://anime-gql.herokuapp.com' || 'http://localhost:5000';

const client = new ApolloClient({
  uri: `${API_BASE_URL}/graphql`,
  cache: new InMemoryCache(),
});

function QueryResultBox({ queryString }) {
  let [state, setState] = useState({
    loading: false,
    data: '',
    error: 'noerr',
  });

  useEffect(() => {
    execQuery();
  }, []);

  async function execQuery() {
    setState({
      data: {},
      loading: true,
    });

    try {
      client
        .query({
          query: gql`
            ${queryString}
          `,
        })
        .then(result => {
          setState({
            data: result.data,
            loading: false,
          });
        })
        .catch(err => {
          setState({
            data: { errors: err },
            loading: false,
          });
        });
    } catch (err) {
      console.log('error', err.result);
    }
  }
  return (
    <div id="query-result-box">
      <div id="query-result-box__play-button" color="primary">
        <Fab onClick={execQuery} color="primary" aria-label="add">
          <PlayArrowRoundedIcon />
        </Fab>
      </div>
      {state.loading && (
        <div id="query-result-box__loader__wrapper">
          <CircularProgress color="secondary" />
        </div>
      )}
      {(Object.keys(state.data).length != 0) && (
        <div class="query-result-box__result-wrapper">
          <JSONPretty id="json-pretty" data={state.data}></JSONPretty>
        </div>
      )}
    </div>
  );
}

export default QueryResultBox;
